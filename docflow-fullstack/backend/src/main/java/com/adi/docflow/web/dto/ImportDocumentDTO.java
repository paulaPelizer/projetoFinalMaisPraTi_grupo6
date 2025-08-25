package com.adi.docflow.web.dto;

public record ImportDocumentDTO(
        Long projectId,
        String code,
        String title,
        Integer revision // opcional; se nulo assume 1
) {}
