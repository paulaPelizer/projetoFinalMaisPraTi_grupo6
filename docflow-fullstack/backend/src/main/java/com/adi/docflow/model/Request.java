package com.adi.docflow.model;

import jakarta.persistence.*;
import java.time.OffsetDateTime;

@Entity
@Table(name = "request", schema = "app")
public class Request {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="request_number", length=40, unique = true)
    private String requestNumber; // REQ-YYYYNNN

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id")
    private Project project;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "origin_id")
    private Organization origin;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "destination_id")
    private Organization destination;

    @Column(length=120)
    private String purpose;

    @Column(columnDefinition="NVARCHAR(MAX)")
    private String description;

    @Column(name="requester_name", length=120)
    private String requesterName;

    @Column(name="requester_contact", length=120)
    private String requesterContact;

    @Column(name="target_name", length=120)
    private String targetName;

    @Column(name="target_contact", length=120)
    private String targetContact;

    private OffsetDateTime requestDate;
    private OffsetDateTime deadline;

    @Column(columnDefinition="NVARCHAR(MAX)")
    private String justification;

    @Column(name="special_instructions", columnDefinition="NVARCHAR(MAX)")
    private String specialInstructions;

    @Enumerated(EnumType.STRING)
    @Column(length=20, nullable=false)
    private RequestStatus status = RequestStatus.PENDING;

    @Column(name="created_at", nullable=false)
    private OffsetDateTime createdAt;

    @Column(name="updated_at", nullable=false)
    private OffsetDateTime updatedAt;

    // getters/setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getRequestNumber() { return requestNumber; }
    public void setRequestNumber(String requestNumber) { this.requestNumber = requestNumber; }
    public Project getProject() { return project; }
    public void setProject(Project project) { this.project = project; }
    public Organization getOrigin() { return origin; }
    public void setOrigin(Organization origin) { this.origin = origin; }
    public Organization getDestination() { return destination; }
    public void setDestination(Organization destination) { this.destination = destination; }
    public String getPurpose() { return purpose; }
    public void setPurpose(String purpose) { this.purpose = purpose; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getRequesterName() { return requesterName; }
    public void setRequesterName(String requesterName) { this.requesterName = requesterName; }
    public String getRequesterContact() { return requesterContact; }
    public void setRequesterContact(String requesterContact) { this.requesterContact = requesterContact; }
    public String getTargetName() { return targetName; }
    public void setTargetName(String targetName) { this.targetName = targetName; }
    public String getTargetContact() { return targetContact; }
    public void setTargetContact(String targetContact) { this.targetContact = targetContact; }
    public OffsetDateTime getRequestDate() { return requestDate; }
    public void setRequestDate(OffsetDateTime requestDate) { this.requestDate = requestDate; }
    public OffsetDateTime getDeadline() { return deadline; }
    public void setDeadline(OffsetDateTime deadline) { this.deadline = deadline; }
    public String getJustification() { return justification; }
    public void setJustification(String justification) { this.justification = justification; }
    public String getSpecialInstructions() { return specialInstructions; }
    public void setSpecialInstructions(String specialInstructions) { this.specialInstructions = specialInstructions; }
    public RequestStatus getStatus() { return status; }
    public void setStatus(RequestStatus status) { this.status = status; }
    public OffsetDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(OffsetDateTime createdAt) { this.createdAt = createdAt; }
    public OffsetDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(OffsetDateTime updatedAt) { this.updatedAt = updatedAt; }
}
