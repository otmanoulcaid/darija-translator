all: back front

back :
	@cd backend && mvn spring-boot:run

front :
	@(cd frontend && npm i && ng serve)
