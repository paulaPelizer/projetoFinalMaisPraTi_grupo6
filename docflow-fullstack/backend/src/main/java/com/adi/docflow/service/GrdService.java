package com.adi.docflow.service;

import com.adi.docflow.model.*;
import com.adi.docflow.repository.*;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class GrdService {

    private final GrdRepository grdRepo;
    private final GrdItemRepository grdItemRepo;
    private final RequestRepository requestRepo;
    private final RequestDocumentRepository reqDocRepo;

    public GrdService(GrdRepository grdRepo, GrdItemRepository grdItemRepo,
                      RequestRepository requestRepo, RequestDocumentRepository reqDocRepo) {
        this.grdRepo = grdRepo;
        this.grdItemRepo = grdItemRepo;
        this.requestRepo = requestRepo;
        this.reqDocRepo = reqDocRepo;
    }

    private String nextGrdNumber() {
        return "GRD-" + java.time.Year.now() + "-" + UUID.randomUUID().toString().substring(0,6).toUpperCase();
    }

    private String nextProtocol() {
        return "PROT-" + java.time.Year.now() + "-" + UUID.randomUUID().toString().substring(0,8).toUpperCase();
    }

    @Transactional
    public Grd generateFromRequest(Long requestId, String deliveryMethod, String emittedBy, String observations) {
        Request req = requestRepo.findById(requestId).orElseThrow();
        Grd grd = new Grd();
        grd.setNumber(nextGrdNumber());
        grd.setProtocol(nextProtocol());
        grd.setProject(req.getProject());
        grd.setOrigin(req.getOrigin());
        grd.setDestination(req.getDestination());
        grd.setPurpose(req.getPurpose());
        grd.setDeliveryMethod(deliveryMethod);
        grd.setObservations(observations);
        grd.setStatus(GrdStatus.EMITTED);
        grd.setEmittedBy(emittedBy == null ? "DocFlow" : emittedBy);
        grd.setEmissionAt(OffsetDateTime.now());
        grd.setRequest(req);
        Grd saved = grdRepo.save(grd);

        // Items
        List<RequestDocument> docs = reqDocRepo.findByRequest(req);
        for (RequestDocument rd : docs) {
            GrdItem item = new GrdItem();
            item.setGrd(saved);
            item.setDocument(rd.getDocument());
            item.setRevision(rd.getDocument().getRevision());
            item.setFormat(rd.getDocument().getFormat());
            item.setPages(rd.getDocument().getPages());
            grdItemRepo.save(item);
        }
        return saved;
    }
}
