package com.adi.docflow.model;

import jakarta.persistence.*;
import java.time.OffsetDateTime;

@Entity
@Table(name="grd", schema="app")
public class Grd {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length=50, unique = true, nullable=false)
    private String number;

    @Column(length=40, unique = true)
    private String protocol;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="project_id")
    private Project project;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="origin_id")
    private Organization origin;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="destination_id")
    private Organization destination;

    @Column(length=120)
    private String purpose;

    @Column(name="delivery_method", length=60)
    private String deliveryMethod;

    @Column(columnDefinition="NVARCHAR(MAX)")
    private String observations;

    @Enumerated(EnumType.STRING)
    @Column(length=20, nullable=false)
    private GrdStatus status = GrdStatus.EMITTED;

    @Column(name="emitted_by", length=120)
    private String emittedBy;

    @Column(name="emission_at")
    private OffsetDateTime emissionAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="request_id")
    private Request request;

    // getters/setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNumber() { return number; }
    public void setNumber(String number) { this.number = number; }
    public String getProtocol() { return protocol; }
    public void setProtocol(String protocol) { this.protocol = protocol; }
    public Project getProject() { return project; }
    public void setProject(Project project) { this.project = project; }
    public Organization getOrigin() { return origin; }
    public void setOrigin(Organization origin) { this.origin = origin; }
    public Organization getDestination() { return destination; }
    public void setDestination(Organization destination) { this.destination = destination; }
    public String getPurpose() { return purpose; }
    public void setPurpose(String purpose) { this.purpose = purpose; }
    public String getDeliveryMethod() { return deliveryMethod; }
    public void setDeliveryMethod(String deliveryMethod) { this.deliveryMethod = deliveryMethod; }
    public String getObservations() { return observations; }
    public void setObservations(String observations) { this.observations = observations; }
    public GrdStatus getStatus() { return status; }
    public void setStatus(GrdStatus status) { this.status = status; }
    public String getEmittedBy() { return emittedBy; }
    public void setEmittedBy(String emittedBy) { this.emittedBy = emittedBy; }
    public OffsetDateTime getEmissionAt() { return emissionAt; }
    public void setEmissionAt(OffsetDateTime emissionAt) { this.emissionAt = emissionAt; }
    public Request getRequest() { return request; }
    public void setRequest(Request request) { this.request = request; }
}
