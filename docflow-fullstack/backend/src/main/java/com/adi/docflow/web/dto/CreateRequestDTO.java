package com.adi.docflow.web.dto;

import java.time.OffsetDateTime;
import java.util.List;

public class CreateRequestDTO {
    public Long projectId;
    public Long originId;
    public Long destinationId;
    public String purpose;
    public String description;
    public String requesterName;
    public String requesterContact;
    public String targetName;
    public String targetContact;
    public OffsetDateTime requestDate;
    public OffsetDateTime deadline;
    public String justification;
    public String specialInstructions;
    public List<Long> documentIds;
}
