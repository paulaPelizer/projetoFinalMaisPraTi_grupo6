package com.adi.docflow.web.dto;

import com.adi.docflow.model.OrgType;

public record OrganizationDTO(
        Long id,
        String name,
        OrgType orgType
) {}
