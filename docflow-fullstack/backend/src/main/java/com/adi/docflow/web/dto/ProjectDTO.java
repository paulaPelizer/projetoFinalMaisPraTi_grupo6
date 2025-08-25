package com.adi.docflow.web.dto;

public record ProjectDTO(
        Long id,
        String code,
        String name,
        OrganizationDTO client
) {}
