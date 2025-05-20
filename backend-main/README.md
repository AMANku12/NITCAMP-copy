## Setting up the docker container
```
# start colima
colima start

# list docker images
docker image ls

# pull the latest docker image
docker pull postgres

# Create and run a new docker container in a detached state with port forwarded from container to host and with environment variable set to the specified value.
docker run -d --name nitcamp -p 5432:5432 -e POSTGRES_PASSWORD=pass123 postgres

# list all containers
docker ps -a

# get an interactive session to the container
docker exec -it 8ade777cdf88291492f4f3433d7fd55291aa750872e75500e834c68bd203e9d3 /bin/sh

# Switch to the postgres user
su postgres

# psql --list
List all databases

# make the nitcamp DB
createdb --port 5432 --username postgres --password nitcamp
#Password will be prompted: nitcamppass

# Add to .env
PORT=8081
DB_NAME=nitcamp
HOST_NAME=postgres
DB_PW=pass123
```


