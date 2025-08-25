// com/adi/docflow/web/GrdController.java
package com.adi.docflow.web;

import com.adi.docflow.model.Grd;
import com.adi.docflow.model.Request;
import com.adi.docflow.repository.GrdRepository;
import com.adi.docflow.repository.RequestRepository;
import com.adi.docflow.web.dto.CreateGrdDTO;
import com.adi.docflow.web.dto.GrdDTO;
import jakarta.transaction.Transactional;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.time.OffsetDateTime;
import java.time.Year;
import java.util.UUID;


@RestController
@RequestMapping("/api/v1/grds")
public class GrdController {

    private final GrdRepository grdRepo;
    private final RequestRepository requestRepo;
    // algo curto e único, cabe em varchar comum (ex.: 14~16 chars)
    private String nextGrdNumber() {
    return "GRD-" + Year.now().getValue() + "-" +
           UUID.randomUUID().toString().substring(0, 6).toUpperCase();
    }


    public GrdController(GrdRepository grdRepo, RequestRepository requestRepo) {
        this.grdRepo = grdRepo;
        this.requestRepo = requestRepo;
    }

    private GrdDTO toDTO(Grd g) {
        Long reqId = g.getRequest() != null ? g.getRequest().getId() : null;
        return new GrdDTO(
                g.getId(),
                reqId,
                g.getDeliveryMethod(),
                g.getEmittedBy(),
                g.getObservations()
        );
    }

    @PostMapping
    @Transactional
    public ResponseEntity<GrdDTO> create(@RequestBody CreateGrdDTO dto) {
        Request req = requestRepo.findById(dto.requestId())
                .orElseThrow(() -> new IllegalArgumentException("requestId não encontrado: " + dto.requestId()));

        Grd g = new Grd();
        g.setRequest(req);
        g.setDeliveryMethod(dto.deliveryMethod());
        g.setEmittedBy(dto.emittedBy());
        g.setObservations(dto.observations());
        g.setNumber(nextGrdNumber());               // preenche a coluna NOT NULL
        g.setEmissionAt(OffsetDateTime.now());  

        Grd saved = grdRepo.save(g);
        return ResponseEntity.created(URI.create("/api/v1/grds/" + saved.getId()))
                .body(toDTO(saved));
    }

    @GetMapping("/{id}")
    @Transactional(Transactional.TxType.SUPPORTS)
    public ResponseEntity<GrdDTO> get(@PathVariable Long id) {
        return grdRepo.findById(id)
                .map(g -> ResponseEntity.ok(toDTO(g)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
