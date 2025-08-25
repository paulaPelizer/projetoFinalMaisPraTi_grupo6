package com.adi.docflow.web.dto;

import java.util.List;

public record ImportReportDTO(
        int received,
        int created,
        int skipped,
        List<RowError> errors
) {
    public record RowError(
            int index,         // posição no array recebido (0-based)
            Long projectId,
            String code,
            Integer revision,
            String message
    ) {}
}
