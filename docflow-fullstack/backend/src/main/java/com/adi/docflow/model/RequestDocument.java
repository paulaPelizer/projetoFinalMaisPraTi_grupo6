package com.adi.docflow.model;

import jakarta.persistence.*;

@Entity
@Table(name="request_document", schema="app",
       uniqueConstraints={@UniqueConstraint(name="uq_request_doc", columnNames={"request_id","document_id"})})
public class RequestDocument {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="request_id", nullable=false)
    private Request request;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="document_id", nullable=false)
    private Document document;

    @Column(name="is_required", nullable=false)
    private boolean required;

    // getters/setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Request getRequest() { return request; }
    public void setRequest(Request request) { this.request = request; }
    public Document getDocument() { return document; }
    public void setDocument(Document document) { this.document = document; }
    public boolean isRequired() { return required; }
    public void setRequired(boolean required) { this.required = required; }
}
