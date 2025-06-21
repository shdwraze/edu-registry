package com.shdwraze.eduregistry.dto;

import com.shdwraze.eduregistry.dict.SchoolType;

public class SchoolFilterDTO {
	private String region;
	private SchoolType type;
	private Boolean isActive;

	public SchoolFilterDTO() {
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

	public Boolean getActive() {
		return isActive;
	}

	public void setActive(Boolean active) {
		isActive = active;
	}
}
