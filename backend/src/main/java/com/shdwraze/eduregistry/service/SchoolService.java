package com.shdwraze.eduregistry.service;

import com.shdwraze.eduregistry.dto.SchoolCreateDTO;
import com.shdwraze.eduregistry.dto.SchoolFilterDTO;
import com.shdwraze.eduregistry.dto.SchoolResponseDTO;

import java.util.List;

public interface SchoolService {
	List<SchoolResponseDTO> getAllSchools(SchoolFilterDTO filters);

	SchoolResponseDTO createSchool(SchoolCreateDTO schoolCreateDTO);

	SchoolResponseDTO deactivateSchool(Long id);

	List<String> getDistinctRegions();
}
