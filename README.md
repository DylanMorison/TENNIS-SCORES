# TENNIS-SCORES

### Requirements 
- git
- node & npm
- Docker
- Docker Compose
- `.env` file

### Development
```bash
- clone repo
git clone git@github.com:DylanMorison/TENNIS-SCORES.git
```
- Place .env file in `./api directory`

- build Docker images with docker-compose
```bash
cd ..
docker-compose build
```
- start up all docker containeirs for dev 
```bash
docker-compose up 
```

Open browser and navigate to http://localhost:10000/

### Debugging 

```
docker-compose down -v
```

https://rapidapi.com/apidojo/api/livescore6/
