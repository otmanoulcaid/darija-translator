back :
	@(cd backend && mvn clean && mvn spring-boot:run)

front :
	@(cd frontend && npm i && ng serve)