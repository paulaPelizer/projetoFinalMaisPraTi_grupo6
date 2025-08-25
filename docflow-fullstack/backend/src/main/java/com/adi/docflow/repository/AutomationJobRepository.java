package com.adi.docflow.repository;

import com.adi.docflow.job.JobStatus;
import com.adi.docflow.model.AutomationJob;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.Optional;

public interface AutomationJobRepository extends JpaRepository<AutomationJob, Long> {
    Optional<AutomationJob> findByUuid(String uuid);

    List<AutomationJob> findTop10ByStatusAndScheduledAtLessThanEqualOrderByScheduledAtAsc(
            JobStatus status, OffsetDateTime scheduledAt);
}
