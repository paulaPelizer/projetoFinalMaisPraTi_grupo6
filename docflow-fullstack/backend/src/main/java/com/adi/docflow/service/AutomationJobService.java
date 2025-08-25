package com.adi.docflow.service;

import com.adi.docflow.job.JobStatus;
import com.adi.docflow.job.JobType;
import com.adi.docflow.model.AutomationJob;
import com.adi.docflow.repository.AutomationJobRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
/*import java.util.Map;*/
import java.util.Optional;
import java.util.UUID;

@Service
public class AutomationJobService {

    private final AutomationJobRepository repository;

    public AutomationJobService(AutomationJobRepository repository) {
        this.repository = repository;
    }

    @Transactional
    public AutomationJob create(JobType type, String payload, OffsetDateTime scheduledAt) {
        AutomationJob job = new AutomationJob();
        job.setUuid(UUID.randomUUID().toString());
        job.setType(type);
        job.setStatus(JobStatus.QUEUED);
        job.setPayload(payload);
        OffsetDateTime now = OffsetDateTime.now();
        job.setScheduledAt(scheduledAt != null ? scheduledAt : now);
        job.setCreatedAt(now);
        job.setUpdatedAt(now);
        return repository.save(job);
    }

    public Optional<AutomationJob> getByUuid(String uuid) {
        return repository.findByUuid(uuid);
    }

    public java.util.List<AutomationJob> fetchPending(int max) {
        return repository.findTop10ByStatusAndScheduledAtLessThanEqualOrderByScheduledAtAsc(
                JobStatus.QUEUED, OffsetDateTime.now());
    }

    @Transactional
    public void markRunning(AutomationJob job) {
        job.setStatus(JobStatus.RUNNING);
        job.setStartedAt(OffsetDateTime.now());
        job.setUpdatedAt(OffsetDateTime.now());
        repository.save(job);
    }

    @Transactional
    public void markSuccess(AutomationJob job) {
        job.setStatus(JobStatus.SUCCESS);
        job.setFinishedAt(OffsetDateTime.now());
        job.setUpdatedAt(OffsetDateTime.now());
        repository.save(job);
    }

    @Transactional
    public void markFailed(AutomationJob job, String error) {
        job.setStatus(JobStatus.FAILED);
        job.setErrorMessage(error);
        job.setFinishedAt(OffsetDateTime.now());
        job.setUpdatedAt(OffsetDateTime.now());
        repository.save(job);
    }
}
