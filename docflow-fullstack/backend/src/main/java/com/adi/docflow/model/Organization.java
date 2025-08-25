package com.adi.docflow.model;

import jakarta.persistence.*;

@Entity
@Table(name = "organization", schema = "app")
public class Organization {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable=false, length=180)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(name="org_type", nullable=false, length=20)
    private OrgType orgType;

    @Column(length=18) // CNPJ
    private String cnpj;

    @Column(length=120)
    private String email;

    @Column(length=40)
    private String phone;

    @Column(length=255)
    private String address;

    // getters/setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public OrgType getOrgType() { return orgType; }
    public void setOrgType(OrgType orgType) { this.orgType = orgType; }
    public String getCnpj() { return cnpj; }
    public void setCnpj(String cnpj) { this.cnpj = cnpj; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
}
