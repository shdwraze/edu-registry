package com.shdwraze.eduregistry.model;

import com.shdwraze.eduregistry.dict.SchoolType;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "schools", uniqueConstraints = @UniqueConstraint(columnNames = "edrpou"))
public class School {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotBlank(message = "Назва школи обов'язкова")
	@Size(max = 255, message = "Назва не може перевищувати 255 символів")
	@Column(nullable = false)
	private String name;

	@NotBlank(message = "ЄДРПОУ обов'язковий")
	@Pattern(regexp = "\\d{8}", message = "ЄДРПОУ повинен містити 8 цифр")
	@Column(nullable = false, unique = true, length = 8)
	private String edrpou;

	@NotBlank(message = "Область обов'язкова")
	@Size(max = 100, message = "Назва області не може перевищувати 100 символів")
	@Column(nullable = false)
	private String region;

	@Enumerated(EnumType.STRING)
	@NotNull(message = "Тип школи обов'язковий")
	@Column(nullable = false)
	private SchoolType type;

	@Column(name = "is_active", nullable = false)
	private Boolean isActive = true;

	@CreationTimestamp
	@Column(name = "created_at", nullable = false, updatable = false)
	private LocalDateTime createdAt;

	@UpdateTimestamp
	@Column(name = "updated_at", nullable = false)
	private LocalDateTime updatedAt;

	public School() {
	}

	public School(String name, String edrpou, String region, SchoolType type) {
		this.name = name;
		this.edrpou = edrpou;
		this.region = region;
		this.type = type;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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

	public Boolean getActive() {
		return isActive;
	}

	public void setActive(Boolean active) {
		isActive = active;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

	public LocalDateTime getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(LocalDateTime updatedAt) {
		this.updatedAt = updatedAt;
	}
}
