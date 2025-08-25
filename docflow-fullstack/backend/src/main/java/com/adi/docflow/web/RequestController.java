package com.adi.docflow.web;

import com.adi.docflow.model.*;
import com.adi.docflow.repository.RequestDocumentRepository;
import com.adi.docflow.service.RequestService;
import com.adi.docflow.web.dto.*;
import jakarta.transaction.Transactional;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.time.OffsetDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/v1/requests")
public class RequestController {

    private final RequestService service;
    private final RequestDocumentRepository reqDocRepo;

    public RequestController(RequestService service,
                             RequestDocumentRepository reqDocRepo) {
        this.service = service;
        this.reqDocRepo = reqDocRepo;
    }

    // --------- MAPEADORES DTO ---------

    private OrganizationDTO toDTO(Organization o) {
        if (o == null) return null;
        return new OrganizationDTO(o.getId(), o.getName(), o.getOrgType());
    }

    private ProjectDTO toDTO(Project p) {
        if (p == null) return null;
        return new ProjectDTO(
                p.getId(),
                p.getCode(),
                p.getName(),
                toDTO(p.getClient())
        );
    }

    private DocumentDTO toDTO(Document d) {
        if (d == null) return null;
        return new DocumentDTO(
                d.getId(),
                d.getCode(),
                d.getTitle(),     // <--- era getName()
                d.getRevision(),
                d.getProject() != null ? d.getProject().getId() : null
        );
    }

    private RequestResponseDTO toDTO(Request r) {
        // carrega documentos via tabela de junção
        List<DocumentDTO> docs = reqDocRepo.findByRequestId(r.getId()).stream()
                .map(RequestDocument::getDocument)
                .map(this::toDTO)
                .toList();

        // >>> Assinatura completa do RequestResponseDTO (na ordem que o compilador cobrou)
        return new RequestResponseDTO(
                r.getId(),
                r.getRequestNumber(),
                toDTO(r.getProject()),
                toDTO(r.getOrigin()),
                toDTO(r.getDestination()),
                r.getPurpose(),
                r.getDescription(),
                r.getRequesterName(),
                r.getRequesterContact(),
                r.getTargetName(),
                r.getTargetContact(),
                r.getRequestDate(),
                r.getDeadline(),
                r.getJustification(),
                r.getSpecialInstructions(),
                r.getStatus(),
                docs
        );
    }

    // --------- ENDPOINTS ---------

    @PostMapping
    public ResponseEntity<RequestResponseDTO> create(@RequestBody CreateRequestDTO dto) {
        Request r = new Request();
        r.setProject(service.requireProject(dto.projectId));
        r.setOrigin(service.requireOrg(dto.originId));
        r.setDestination(service.requireOrg(dto.destinationId));
        r.setPurpose(dto.purpose);
        r.setDescription(dto.description);
        r.setRequesterName(dto.requesterName);
        r.setRequesterContact(dto.requesterContact);
        r.setTargetName(dto.targetName);
        r.setTargetContact(dto.targetContact);
        r.setRequestDate(dto.requestDate != null ? dto.requestDate : OffsetDateTime.now());
        r.setDeadline(dto.deadline);
        r.setJustification(dto.justification);
        r.setSpecialInstructions(dto.specialInstructions);

        Request saved = service.create(r, dto.documentIds);
        return ResponseEntity
                .created(URI.create("/api/v1/requests/" + saved.getId()))
                .body(toDTO(saved));
    }

    @GetMapping("{id}")
    @Transactional(Transactional.TxType.SUPPORTS)
    public ResponseEntity<RequestResponseDTO> get(@PathVariable Long id) {
        return service.get(id)
                .map(req -> ResponseEntity.ok(toDTO(req)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    @Transactional(Transactional.TxType.SUPPORTS)
    public ResponseEntity<List<RequestResponseDTO>> list(
            @RequestParam(name = "status", required = false) RequestStatus status
    ) {
        List<Request> data = (status != null)
                ? service.listByStatus(status)
                : service.listAll();

        return ResponseEntity.ok(
                data.stream().map(this::toDTO).toList()
        );
    }
}
