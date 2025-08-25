// CreateGrdDTO.java
package com.adi.docflow.web.dto;

public record CreateGrdDTO(
        Long requestId,
        String deliveryMethod,
        String emittedBy,
        String observations
) {}