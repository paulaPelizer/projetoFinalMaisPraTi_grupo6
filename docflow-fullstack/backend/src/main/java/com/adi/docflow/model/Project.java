package com.adi.docflow.model;

import jakarta.persistence.*;

@Entity
@Table(name = "project", schema = "app")
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable=false, length=40, unique = true)
    private String code;

    @Column(nullable=false, length=180)
    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "client_id")
    private Organization client;

    // getters/setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public Organization getClient() { return client; }
    public void setClient(Organization client) { this.client = client; }
}
