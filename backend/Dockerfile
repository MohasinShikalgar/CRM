# Stage 1: Build the application with Maven
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app

# Copy pom.xml and source files
COPY pom.xml .
COPY src ./src

# Package the application (skipping tests for faster build)
RUN mvn clean package -DskipTests

# Stage 2: Create a lightweight runtime image
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Copy the built jar from build stage
COPY --from=build /app/target/*.jar app.jar

# Expose default port
EXPOSE 9098

# Run the jar with dynamic port binding
ENTRYPOINT ["java", "-jar", "app.jar"]
