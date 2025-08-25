
package com.adi.docflow.web.dto;

public record GrdDTO(
        Long id,
        Long requestId,
        String deliveryMethod,
        String emittedBy,
        String observations
) {}
