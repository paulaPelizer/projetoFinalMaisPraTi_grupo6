package com.adi.docflow.web;

import com.adi.docflow.model.AutomationJob;
import com.adi.docflow.service.AutomationJobService;
import com.adi.docflow.web.dto.CreateJobRequest;
import com.adi.docflow.web.dto.JobResponse;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/jobs")
public class JobController {

    private final AutomationJobService service;

    public JobController(AutomationJobService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<JobResponse> create(@Valid @RequestBody CreateJobRequest req) {
        AutomationJob job = service.create(req.getType(), req.getPayload(), req.getScheduledAt());
        return ResponseEntity
                .created(URI.create("/api/v1/jobs/" + job.getUuid()))
                .body(JobResponse.from(job));
    }

    @GetMapping("{uuid}")
    public ResponseEntity<JobResponse> get(@PathVariable String uuid) {
        Optional<AutomationJob> job = service.getByUuid(uuid);
        return job.map(value -> ResponseEntity.ok(JobResponse.from(value)))
                  .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
