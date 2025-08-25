package com.adi.docflow.repository;

import com.adi.docflow.model.Grd;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GrdRepository extends JpaRepository<Grd, Long> {
    Page<Grd> findByRequestId(Long requestId, Pageable pageable);
}
