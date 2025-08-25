package com.adi.docflow.web.dto;

public record DocumentDTO(
        Long id,
        String code,
        String title,     // ou "name"
        String revision,  // <- String
        Long projectId
) {}
