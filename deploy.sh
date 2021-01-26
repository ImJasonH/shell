#!/bin/sh

set -euxo pipefail

PROJECT_ID=$(gcloud config get-value project)
time pack build gcr.io/${PROJECT_ID}/shell --builder=gcr.io/buildpacks/builder:v1 --publish
gcloud run deploy shell --image=gcr.io/${PROJECT_ID}/shell \
  --platform=managed \
  --allow-unauthenticated \
  --max-instances=1 \
  --timeout=1m --cpu=1 --memory=256Mi  # Limit requests.
