#!/bin/bash

# Variables
IMAGE_NAME="api-ichapter"
CONTAINER_NAME="api-ichapter"
PORT="8082"

# Build the Docker image
rebuild() {
  echo 'Rebuilding......'
  git pull
  docker stop "$CONTAINER_NAME"
  docker rm "$CONTAINER_NAME"
  docker build -f Dockerfile.dev --no-cache --platform linux/amd64 -t "$IMAGE_NAME" .
  docker run -d --name "$CONTAINER_NAME" -p "$PORT":"$PORT" --network=ichapter "$IMAGE_NAME"
}

# Main
rebuild