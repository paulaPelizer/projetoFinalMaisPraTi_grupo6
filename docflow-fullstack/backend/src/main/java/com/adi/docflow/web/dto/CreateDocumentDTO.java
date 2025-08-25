package com.adi.docflow.web.dto;

public record CreateDocumentDTO(
        Long projectId,
        String code,
        String title,     // ou "name", se sua entidade usa esse nome
        String revision   // <- String, pois sua entidade Document usa String
) {}
