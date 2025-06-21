package com.shdwraze.eduregistry.dto;

import com.shdwraze.eduregistry.dict.SchoolType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class SchoolCreateDTO {
	@NotBlank(message = "Назва школи обов'язкова")
	@Size(max = 255, message = "Назва не може перевищувати 255 символів")
	private String name;

	@NotBlank(message = "ЄДРПОУ обов'язковий")
	@Pattern(regexp = "\\d{8}", message = "ЄДРПОУ повинен містити 8 цифр")
	private String edrpou;

	@NotBlank(message = "Область обов'язкова")
	@Size(max = 100, message = "Назва області не може перевищувати 100 символів")
	private String region;

	@NotNull(message = "Тип школи обов'язковий")
	private SchoolType type;

	public SchoolCreateDTO() {
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEdrpou() {
		return edrpou;
	}

	public void setEdrpou(String edrpou) {
		this.edrpou = edrpou;
	}

	public String getRegion() {
		return region;
	}

	public void setRegion(String region) {
		this.region = region;
	}

	public SchoolType getType() {
		return type;
	}

	public void setType(SchoolType type) {
		this.type = type;
	}
}
