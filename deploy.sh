#!/bin/sh

set -euxo pipefail

PROJECT_ID=$(gcloud config get-value project)
IMAGE=gcr.io/${PROJECT_ID}/shell
docker build -t ${IMAGE} .
docker push ${IMAGE}
gcloud run deploy shell --image=${IMAGE} \
  --platform=managed \
  --allow-unauthenticated \
  --max-instances=1 \
  --timeout=1m --cpu=1 --memory=256Mi  # Limit requests.
