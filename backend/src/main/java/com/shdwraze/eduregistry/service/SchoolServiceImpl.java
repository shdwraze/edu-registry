package com.shdwraze.eduregistry.service;

import com.shdwraze.eduregistry.dto.SchoolCreateDTO;
import com.shdwraze.eduregistry.dto.SchoolFilterDTO;
import com.shdwraze.eduregistry.dto.SchoolResponseDTO;
import com.shdwraze.eduregistry.exception.SchoolNotFoundException;
import com.shdwraze.eduregistry.model.School;
import com.shdwraze.eduregistry.repository.SchoolRepository;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SchoolServiceImpl implements SchoolService {

	private final SchoolRepository schoolRepository;

	public SchoolServiceImpl(SchoolRepository schoolRepository) {
		this.schoolRepository = schoolRepository;
	}

	@Transactional(readOnly = true)
	@Override
	public List<SchoolResponseDTO> getAllSchools(SchoolFilterDTO filters) {
		List<School> schools = schoolRepository.findByFilters(filters.getRegion(), filters.getType(), filters.getActive());
		return schools.stream()
				.map(this::mapToResponseDTO)
				.collect(Collectors.toList());
	}

	@Transactional
	@Override
	public SchoolResponseDTO createSchool(SchoolCreateDTO schoolCreateDTO) {
		if (schoolRepository.findByEdrpou(schoolCreateDTO.getEdrpou()).isPresent()) {
			throw new DataIntegrityViolationException("Школа з ЄДРПОУ " + schoolCreateDTO.getEdrpou() + " вже існує");
		}
		School school = new School(
				schoolCreateDTO.getName(),
				schoolCreateDTO.getEdrpou(),
				schoolCreateDTO.getRegion(),
				schoolCreateDTO.getType());
		School savedSchool = schoolRepository.save(school);
		return mapToResponseDTO(savedSchool);
	}

	@Transactional
	@Override
	public SchoolResponseDTO deactivateSchool(Long id) {
		School school = schoolRepository.findById(id).orElseThrow(() -> new SchoolNotFoundException("Школу з ID " + id + " не знайдено"));
		if (!school.getActive()) {
			throw new IllegalStateException("Школа вже деактивована");
		}
		school.setActive(false);
		School deactivatedSchool = schoolRepository.save(school);

		return mapToResponseDTO(deactivatedSchool);
	}

	@Transactional(readOnly = true)
	@Override
	public List<String> getDistinctRegions() {
		return schoolRepository.findDistinctRegions();
	}

	private SchoolResponseDTO mapToResponseDTO(School school) {
		return new SchoolResponseDTO(
				school.getId(),
				school.getName(),
				school.getEdrpou(),
				school.getRegion(),
				school.getType(),
				school.getActive(),
				school.getCreatedAt(),
				school.getUpdatedAt()
		);
	}
}
