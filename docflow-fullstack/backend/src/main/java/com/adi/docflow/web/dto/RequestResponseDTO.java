package com.adi.docflow.web.dto;

import com.adi.docflow.model.RequestStatus;
import java.time.OffsetDateTime;
import java.util.List;

public record RequestResponseDTO(
        Long id,
        String requestNumber,
        ProjectDTO project,
        OrganizationDTO origin,
        OrganizationDTO destination,

        // detalhes de negócio
        String purpose,
        String description,
        String requesterName,
        String requesterContact,
        String targetName,
        String targetContact,
        OffsetDateTime requestDate,
        OffsetDateTime deadline,
        String justification,
        String specialInstructions,
        RequestStatus status,

        // documentos associados
        List<DocumentDTO> documents
) {}
