package com.ucc.complaints.repository;

import com.ucc.complaints.model.Evidence;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EvidenceRepository extends JpaRepository<Evidence, Long> { }
