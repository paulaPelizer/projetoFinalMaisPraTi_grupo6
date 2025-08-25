package com.adi.docflow.web.dto;

public record CreateProjectDTO(
        String code,
        String name,
        Long clientId
) {}
