# Run locally

```
npm run start
```

Browse to http://localhost:8080

# Run locally (in Docker)

```
docker build -t shell .
docker run -p 8080:8080 shell
```

Browse to http://localhost:8080

# Deploy

```
./deploy.sh
```

# Teardown

```
gcloud run services delete shell
```
