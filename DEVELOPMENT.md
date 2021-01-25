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
./deploy.sh
```

# Teardown

```
gcloud run services delete shell
```
