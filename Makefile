all: 
	@(cd backend && mvn spring-boot:run) & (cd frontend && ng serve)