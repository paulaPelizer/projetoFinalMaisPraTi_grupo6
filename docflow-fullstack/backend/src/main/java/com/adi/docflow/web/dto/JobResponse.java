package com.adi.docflow.web.dto;

import com.adi.docflow.job.JobStatus;
import com.adi.docflow.job.JobType;
import com.adi.docflow.model.AutomationJob;

import java.time.OffsetDateTime;

public class JobResponse {

    private String uuid;
    private JobType type;
    private JobStatus status;
    private String errorMessage;
    private OffsetDateTime scheduledAt;
    private OffsetDateTime startedAt;
    private OffsetDateTime finishedAt;
    private OffsetDateTime createdAt;
    private OffsetDateTime updatedAt;

    public static JobResponse from(AutomationJob j) {
        JobResponse r = new JobResponse();
        r.uuid = j.getUuid();
        r.type = j.getType();
        r.status = j.getStatus();
        r.errorMessage = j.getErrorMessage();
        r.scheduledAt = j.getScheduledAt();
        r.startedAt = j.getStartedAt();
        r.finishedAt = j.getFinishedAt();
        r.createdAt = j.getCreatedAt();
        r.updatedAt = j.getUpdatedAt();
        return r;
    }

    // Getters only (imutável no response)
    public String getUuid() { return uuid; }
    public JobType getType() { return type; }
    public JobStatus getStatus() { return status; }
    public String getErrorMessage() { return errorMessage; }
    public OffsetDateTime getScheduledAt() { return scheduledAt; }
    public OffsetDateTime getStartedAt() { return startedAt; }
    public OffsetDateTime getFinishedAt() { return finishedAt; }
    public OffsetDateTime getCreatedAt() { return createdAt; }
    public OffsetDateTime getUpdatedAt() { return updatedAt; }
}
