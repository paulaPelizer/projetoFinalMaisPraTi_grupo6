package com.adi.docflow.web.dto;

import com.adi.docflow.job.JobType;
import jakarta.validation.constraints.NotNull;

import java.time.OffsetDateTime;

public class CreateJobRequest {

    @NotNull
    private JobType type;

    // JSON arbitrário para o payload (string crua)
    private String payload;

    // opcional: data futura para agendamento; se nulo, executa ASAP
    private OffsetDateTime scheduledAt;

    public JobType getType() { return type; }
    public void setType(JobType type) { this.type = type; }

    public String getPayload() { return payload; }
    public void setPayload(String payload) { this.payload = payload; }

    public OffsetDateTime getScheduledAt() { return scheduledAt; }
    public void setScheduledAt(OffsetDateTime scheduledAt) { this.scheduledAt = scheduledAt; }
}
