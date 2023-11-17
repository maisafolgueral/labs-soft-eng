# Interface
All components and pages of the social network.

## Start
Change your directory to root folder, and then run:
```
npm install
```

## Execution (for tests)

From your root folder, run:

### Host environment
```
npm run dev
```

### Container
```
docker build -t frontend .
docker run --name frontend -p 5173:5173 frontend
```

Em seguida, acesse:
- http://localhost:5173/