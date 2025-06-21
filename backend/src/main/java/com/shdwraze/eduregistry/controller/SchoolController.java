package com.shdwraze.eduregistry.controller;

import com.shdwraze.eduregistry.dict.SchoolType;
import com.shdwraze.eduregistry.dto.SchoolCreateDTO;
import com.shdwraze.eduregistry.dto.SchoolFilterDTO;
import com.shdwraze.eduregistry.dto.SchoolResponseDTO;
import com.shdwraze.eduregistry.service.SchoolService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/schools")
@CrossOrigin(origins = "http://localhost:3000")
public class SchoolController {

	private final SchoolService schoolService;

	public SchoolController(SchoolService schoolService) {
		this.schoolService = schoolService;
	}

	@GetMapping
	public ResponseEntity<List<SchoolResponseDTO>> getAllSchools(
			@RequestParam(required = false) String region,
			@RequestParam(required = false) SchoolType type,
			@RequestParam(required = false) Boolean isActive) {
		SchoolFilterDTO filters = new SchoolFilterDTO();
		filters.setRegion(region);
		filters.setType(type);
		filters.setActive(isActive);

		List<SchoolResponseDTO> schools = schoolService.getAllSchools(filters);
		return ResponseEntity.ok(schools);
	}

	@PostMapping
	public ResponseEntity<SchoolResponseDTO> createSchool(@Valid @RequestBody SchoolCreateDTO schoolCreateDTO) {
		SchoolResponseDTO createdSchool = schoolService.createSchool(schoolCreateDTO);
		return new ResponseEntity<>(createdSchool, HttpStatus.CREATED);
	}

	@PatchMapping("/{id}/deactivate")
	public ResponseEntity<SchoolResponseDTO> deactivateSchool(@PathVariable Long id) {
		SchoolResponseDTO deactivatedSchool = schoolService.deactivateSchool(id);
		return ResponseEntity.ok(deactivatedSchool);
	}

	@GetMapping("/regions")
	public ResponseEntity<List<String>> getDistinctRegions() {
		List<String> regions = schoolService.getDistinctRegions();
		return ResponseEntity.ok(regions);
	}
}
