package com.adi.docflow.web;

import com.adi.docflow.model.Organization;
import com.adi.docflow.model.OrgType;
import com.adi.docflow.repository.OrganizationRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/v1/orgs")
public class OrganizationController {

    private final OrganizationRepository repo;

    public OrganizationController(OrganizationRepository repo) {
        this.repo = repo;
    }

    @PostMapping
    public ResponseEntity<Organization> create(@RequestBody Organization o) {
        Organization saved = repo.save(o);
        return ResponseEntity.created(URI.create("/api/v1/orgs/" + saved.getId())).body(saved);
    }

    @GetMapping
    public List<Organization> list(@RequestParam(required = false) OrgType type) {
        if (type == null) return repo.findAll();
        return repo.findByOrgType(type);
    }
}
