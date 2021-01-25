# Run locally

```
npm run start
```

Browse to http://localhost:8080

# Run locally (in Docker)

```
pack build cloud-run-shell --builder=gcr.io/buildpacks/builder:v1
docker run -p 8080:8080 cloud-run-shell
```

# Deploy

```
PROJECT_ID=$(gcloud config get-value project)
pack build gcr.io/${PROJECT_ID}/shell --builder=gcr.io/buildpacks/builder:v1 --publish
gcloud run deploy --image=gcr.io/${PROJECT_ID}/shell \
  --concurrency=1 \
  --platform=managed \
  --allow-unauthenticated \
  --max-instances=1
```
