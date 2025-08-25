package com.adi.docflow.model;

import jakarta.persistence.*;

@Entity
@Table(name = "document", schema = "app")
public class Document {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;

    @Column(name = "code", nullable = false)
    private String code;

    // <-- mapear title -> coluna "name"
    @Column(name = "name", nullable = false)
    private String title;

    @Column(name = "revision", nullable = false)
    private String revision; // você decidiu manter como String

    @Column(name = "format")
    private String format;

    @Column(name = "pages")
    private Integer pages;

    @Column(name = "file_url")
    private String fileUrl;

    // getters e setters...
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Project getProject() { return project; }
    public void setProject(Project project) { this.project = project; }

    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getRevision() { return revision; }
    public void setRevision(String revision) { this.revision = revision; }

    public String getFormat() { return format; }
    public void setFormat(String format) { this.format = format; }

    public Integer getPages() { return pages; }
    public void setPages(Integer pages) { this.pages = pages; }

    public String getFileUrl() { return fileUrl; }
    public void setFileUrl(String fileUrl) { this.fileUrl = fileUrl; }
}
