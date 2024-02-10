# Specify image name
name := mern-app

version := $(shell date +'%Y%m%d%H%M%S')

image := ${name}:${version}

.PHONY: build-image
build-image:
 	docker build . --file Dockerfile --tag ${image}

# tag the image and push to container registry
.PHONY: push-github-packages
push-github-packages:
	docker tag ${image} ghcr.io/rohan3011/${image} 
	docker push ghcr.io/rohan3011/${image}

.PHONY: client
client:
	yarn workspace client dev

.PHONY: server
server:
	yarn workspace server dev

# Help command (to show available commands)
help:
	@echo "Available commands:"
	@echo "  make client     - Runs the client in dev"
	@echo "  make server     - Runs the server in dev"