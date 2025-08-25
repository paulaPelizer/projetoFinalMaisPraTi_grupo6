package com.adi.docflow.web;

import com.adi.docflow.model.Organization;
import com.adi.docflow.model.Project;
import com.adi.docflow.repository.OrganizationRepository;
import com.adi.docflow.repository.ProjectRepository;
import com.adi.docflow.web.dto.CreateProjectDTO;
import com.adi.docflow.web.dto.OrganizationDTO;
import com.adi.docflow.web.dto.ProjectDTO;
import jakarta.transaction.Transactional;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequestMapping("/api/v1/projects")
public class ProjectController {

    private final ProjectRepository projectRepo;
    private final OrganizationRepository orgRepo;

    public ProjectController(ProjectRepository projectRepo, OrganizationRepository orgRepo) {
        this.projectRepo = projectRepo;
        this.orgRepo = orgRepo;
    }

    // ---- mapeadores DTO ----
    private OrganizationDTO toDTO(Organization o) {
        if (o == null) return null;
        return new OrganizationDTO(o.getId(), o.getName(), o.getOrgType());
    }

    private ProjectDTO toDTO(Project p) {
        if (p == null) return null;
        return new ProjectDTO(p.getId(), p.getCode(), p.getName(), toDTO(p.getClient()));
    }

    // ---- endpoints ----

    @PostMapping
    @Transactional
    public ResponseEntity<ProjectDTO> create(@RequestBody CreateProjectDTO dto) {
        if (dto == null || dto.name() == null || dto.name().isBlank()) {
            throw new org.springframework.web.server.ResponseStatusException(
                    org.springframework.http.HttpStatus.BAD_REQUEST, "name é obrigatório");
        }

        Project p = new Project();
        p.setCode(dto.code());
        p.setName(dto.name().trim());

        // vincula cliente apenas se vier clientId
        if (dto.clientId() != null) {
            Organization client = orgRepo.findById(dto.clientId())
                    .orElseThrow(() -> new org.springframework.web.server.ResponseStatusException(
                            org.springframework.http.HttpStatus.BAD_REQUEST, "clientId inválido"));
            p.setClient(client);
        }

        Project saved = projectRepo.save(p);
        return ResponseEntity
                .created(URI.create("/api/v1/projects/" + saved.getId()))
                .body(toDTO(saved));
    }

    @GetMapping("/{id}")
    @Transactional(Transactional.TxType.SUPPORTS)
    public ResponseEntity<ProjectDTO> get(@PathVariable("id") Long id) {
        return projectRepo.findById(id)
                .map(p -> ResponseEntity.ok(toDTO(p)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    @Transactional(Transactional.TxType.SUPPORTS)
    public Page<ProjectDTO> list(
            @RequestParam(name = "clientId", required = false) Long clientId,
            @RequestParam(name = "q", required = false) String q,
            @ParameterObject
            @PageableDefault(size = 20, sort = "id", direction = Sort.Direction.DESC) Pageable pageable
    ) {
        Page<Project> page;

        if (clientId != null) {
            page = projectRepo.findByClientId(clientId, pageable);
        } else if (q != null && !q.isBlank()) {
            page = projectRepo.findByCodeContainingIgnoreCaseOrNameContainingIgnoreCase(q, q, pageable);
        } else {
            page = projectRepo.findAll(pageable);
        }

        return page.map(this::toDTO);
    }
}
