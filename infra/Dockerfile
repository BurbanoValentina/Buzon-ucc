FROM node:24-alpine AS frontend-builder
WORKDIR /workspace/frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build

FROM eclipse-temurin:21-jdk AS backend-builder
WORKDIR /workspace/backend
RUN apt-get update && apt-get install -y maven && rm -rf /var/lib/apt/lists/*
COPY backend/pom.xml ./
COPY backend/src ./src
RUN mvn -q -DskipTests package

FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=backend-builder /workspace/backend/target/*.jar app.jar
COPY --from=frontend-builder /workspace/frontend/dist ./frontend/dist
USER 10001:10001
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app/app.jar"]
