# Variables
IMAGE_NAME := api-ichapter
CONTAINER_NAME := api-ichapter
PORT := 8082

# Build the Docker image
build:
	docker build --platform linux/amd64 --no-cache -t $(IMAGE_NAME) .

build-dev:
	docker build -f Dockerfile.dev --platform linux/amd64 -t $(IMAGE_NAME) .

# Run the Docker container
run:
	docker run -d --name $(CONTAINER_NAME) -p $(PORT):$(PORT) --network=ichapter $(IMAGE_NAME)

# Stop the Docker container
stop:
	docker stop $(CONTAINER_NAME)

# Remove the Docker container
rm:
	docker rm $(CONTAINER_NAME)

# Remove the Docker image
rmi:
	docker rmi $(IMAGE_NAME)

run-api:
	docker run -d -p 8082:8082 --name api-ichapter --network ichapter api-ichapter

com-build:
	docker-compose build

com-up:
	docker-compose up -d

