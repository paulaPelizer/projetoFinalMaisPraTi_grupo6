package com.adi.docflow.repository;

import com.adi.docflow.model.Request;
import com.adi.docflow.model.RequestStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RequestRepository extends JpaRepository<Request, Long> {

    List<Request> findTop50ByStatusOrderByCreatedAtDesc(RequestStatus status);

    List<Request> findTop50ByOrderByCreatedAtDesc();
}
