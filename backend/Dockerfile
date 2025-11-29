# ====== BUILD STAGE ======
FROM maven:3.9-eclipse-temurin-21 AS build

# Create working directory inside the image
WORKDIR /app

# First copy only pom.xml (better Docker caching for dependencies)
COPY pom.xml .

# Download dependencies (this will be cached unless pom.xml changes)
RUN mvn -B dependency:go-offline

# Now copy the rest of the source code
COPY src ./src

# Build the JAR (skip tests for faster builds; you can remove -DskipTests later)
RUN mvn -B clean package -DskipTests


# ====== RUNTIME STAGE ======
FROM eclipse-temurin:21-jre

WORKDIR /app

# Copy the built jar from the build stage
# This assumes there is exactly one jar in target (your Spring Boot jar)
COPY --from=build /app/target/*.jar app.jar

# Container will listen on this port
EXPOSE 8080

# Optional: activate a "docker" Spring profile if you want
# ENV SPRING_PROFILES_ACTIVE=docker

# Start the app
ENTRYPOINT ["java", "-jar", "app.jar"]
