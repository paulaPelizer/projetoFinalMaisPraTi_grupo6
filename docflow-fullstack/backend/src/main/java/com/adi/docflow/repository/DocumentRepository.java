package com.adi.docflow.repository;

import com.adi.docflow.model.Document;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DocumentRepository extends JpaRepository<Document, Long> {

    boolean existsByProjectIdAndCodeAndRevision(Long projectId, String code, String revision);

    Optional<Document> findTopByProjectIdAndCodeOrderByRevisionDesc(Long projectId, String code);

    List<Document> findByProjectIdAndCode(Long projectId, String code);
}
