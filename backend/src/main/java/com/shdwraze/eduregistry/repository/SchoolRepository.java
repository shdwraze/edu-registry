package com.shdwraze.eduregistry.repository;

import com.shdwraze.eduregistry.dict.SchoolType;
import com.shdwraze.eduregistry.model.School;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SchoolRepository extends JpaRepository<School, Long> {
	Optional<School> findByEdrpou(String edrpou);

	@Query("SELECT s FROM School s WHERE " +
			"(:region IS NULL OR s.region = :region) AND " +
			"(:type IS NULL OR s.type = :type) AND " +
			"(:isActive IS NULL OR s.isActive = :isActive) " +
			"ORDER BY s.createdAt DESC")
	List<School> findByFilters(@Param("region") String region,
	                           @Param("type") SchoolType type,
	                           @Param("isActive") Boolean isActive);

	@Query("SELECT DISTINCT s.region FROM School s ORDER BY s.region")
	List<String> findDistinctRegions();
}
