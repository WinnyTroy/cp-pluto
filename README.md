## PROJECT SET UP

### PREREQUSITES

## RUN AT THE HOST MACHINE

1. Install Nodejs Version above 12.0.0 < > 14.0.0

```bash
sudo apt-get install nodejs
```

```bash
sudo apt-get install npm
```

2. Install mysql and create database name 'sunculture_db'

3. Create mysql username and password

```bash
CREATE USER 'sunculture_api'@'localhost' IDENTIFIED BY '3EDdDngGWVStyM2fnakDDsgj6ctQ3t=';


GRANT ALL PRIVILEGES ON _._ TO 'sunculture_api'@'localhost' WITH GRANT OPTION;

```

4. Database migration

```bash
sudo sequelize db:migrate
```

5. Run the project

```bash
nodemon bin/www
```

## RUN AS THE DOCKER CONTAINER

1. Install the docker-ce

```bash
sudo apt-get install docker-ce
```

2. Install docker-compose

3. Create Docker network manually

```bash
sudo docker network create sunculture.network
```

4. Run the docker containers

```bash
sudo docker-compose up -d
```

5. Rebuild the docker container

```bash
sudo docker-compose up -d --no-deps --build
```
