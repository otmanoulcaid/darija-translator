all :
	@(cd backend && mvn clean && mvn spring-boot:run & cd frontend && npm i && ng serve)
