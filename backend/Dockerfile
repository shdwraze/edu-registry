FROM openjdk:21-jdk-slim

WORKDIR /app

COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .
COPY src src

RUN ./mvnw dependency:go-offline -B
RUN ./mvnw package -DskipTests

EXPOSE 8080
CMD ["java", "-jar", "target/edu-registry-0.0.1-SNAPSHOT.jar"]
