FROM maven:3.9.7-amazoncorretto-21 AS build
WORKDIR /app
COPY pom.xml .
RUN mvn -q -DskipTests dependency:go-offline
COPY . .
RUN mvn -q -DskipTests package

FROM amazoncorretto:21-alpine
WORKDIR /app
COPY --from=build /app/target/*jar /app/app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app/app.jar"]