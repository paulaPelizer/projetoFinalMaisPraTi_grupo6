package com.adi.docflow.model;

import jakarta.persistence.*;

@Entity
@Table(name="grd_item", schema="app")
public class GrdItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="grd_id", nullable=false)
    private Grd grd;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="document_id", nullable=false)
    private Document document;

    @Column(length=40)
    private String revision;

    @Column(length=10)
    private String format;

    private Integer pages;

    // getters/setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Grd getGrd() { return grd; }
    public void setGrd(Grd grd) { this.grd = grd; }
    public Document getDocument() { return document; }
    public void setDocument(Document document) { this.document = document; }
    public String getRevision() { return revision; }
    public void setRevision(String revision) { this.revision = revision; }
    public String getFormat() { return format; }
    public void setFormat(String format) { this.format = format; }
    public Integer getPages() { return pages; }
    public void setPages(Integer pages) { this.pages = pages; }
}
