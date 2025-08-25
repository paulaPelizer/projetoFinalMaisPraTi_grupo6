package com.adi.docflow.repository;

import com.adi.docflow.model.Request;
import com.adi.docflow.model.RequestDocument;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RequestDocumentRepository extends JpaRepository<RequestDocument, Long> {
    List<RequestDocument> findByRequestId(Long requestId);
    List<RequestDocument> findByRequest(Request request);
}
