package com.adi.docflow.service;

import com.adi.docflow.model.*;
import com.adi.docflow.repository.*;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.*;

@Service
public class RequestService {

    private final RequestRepository requestRepo;
    private final ProjectRepository projectRepo;
    private final OrganizationRepository orgRepo;
    private final DocumentRepository docRepo;
    private final RequestDocumentRepository reqDocRepo;

    public RequestService(RequestRepository requestRepo,
                          ProjectRepository projectRepo,
                          OrganizationRepository orgRepo,
                          DocumentRepository docRepo,
                          RequestDocumentRepository reqDocRepo) {
        this.requestRepo = requestRepo;
        this.projectRepo = projectRepo;
        this.orgRepo = orgRepo;          // << atenção ao nome correto
        this.docRepo = docRepo;
        this.reqDocRepo = reqDocRepo;
    }

    /* Helpers para buscar entidades obrigatórias */
    public Project requireProject(Long id) {
        return projectRepo.findById(id)
                .orElseThrow(() -> new NoSuchElementException("projectId " + id + " não encontrado"));
    }

    public Organization requireOrg(Long id) {
        return orgRepo.findById(id)
                .orElseThrow(() -> new NoSuchElementException("organizationId " + id + " não encontrado"));
    }

    private String nextRequestNumber() {
        return "REQ-" + java.time.Year.now() + "-" +
               UUID.randomUUID().toString().substring(0, 6).toUpperCase();
    }

    @Transactional
    public Request create(Request req, List<Long> documentIds) {
        if (req.getRequestNumber() == null || req.getRequestNumber().isBlank()) {
            req.setRequestNumber(nextRequestNumber());
        }
        OffsetDateTime now = OffsetDateTime.now();
        req.setCreatedAt(now);
        req.setUpdatedAt(now);

        Request saved = requestRepo.save(req);

        if (documentIds != null && !documentIds.isEmpty()) {
            List<Document> docs = docRepo.findAllById(documentIds);

            Set<Long> encontrados = new HashSet<>();
            for (Document d : docs) encontrados.add(d.getId());
            Set<Long> solicitados = new HashSet<>(documentIds);
            solicitados.removeAll(encontrados);
            if (!solicitados.isEmpty()) {
                throw new IllegalArgumentException("documentIds inexistentes: " + solicitados);
            }

            for (Document d : docs) {
                if (!d.getProject().getId().equals(saved.getProject().getId())) {
                    throw new IllegalArgumentException(
                            "documentId " + d.getId() +
                            " não pertence ao projectId " + saved.getProject().getId()
                    );
                }
                RequestDocument rd = new RequestDocument();
                rd.setRequest(saved);
                rd.setDocument(d);
                rd.setRequired(false);
                reqDocRepo.save(rd);
            }
        }

        return saved;
    }

    @Transactional(Transactional.TxType.SUPPORTS)
    public Optional<Request> get(Long id) {
        return requestRepo.findById(id);
    }

    @Transactional(Transactional.TxType.SUPPORTS)
    public List<Request> listByStatus(RequestStatus status) {
        return requestRepo.findTop50ByStatusOrderByCreatedAtDesc(status);
    }

    @Transactional(Transactional.TxType.SUPPORTS)
    public List<Request> listAll() {
        // simples: tudo ordenado pelo mais recente
        return requestRepo.findAll(Sort.by(Sort.Direction.DESC, "createdAt"));
    }
}
