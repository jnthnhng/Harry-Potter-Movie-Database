# Docker registry
REGISTRY ?= index.docker.io

#Image namespace
NAMESPACE ?= default_name_spacw

# image name
NAME ?= node-hpmd-app

# image default tag
IMAGE_TAG ?= latest

IMAGE_NAME = ${REGISTRY}/${NAMESPACE}/${NAME}:${IMAGE_TAG}

build:
	docker build -t ${IMAGE_NAME} .