package com.adi.docflow.repository;

import com.adi.docflow.model.Organization;
import com.adi.docflow.model.OrgType;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface OrganizationRepository extends JpaRepository<Organization, Long> {
    List<Organization> findByOrgType(OrgType orgType);
}
