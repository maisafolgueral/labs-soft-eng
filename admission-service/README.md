# Back-end
Service to receive admissions of people that wants to use the social network.

## Host environment
Change your directory to root folder, and then run:

### Start
```
pip install -r requirements.txt
```

### Execution (for tests)
```
set FLASK_APP=app.py
set FLASK_ENV=development
set PYTHONPATH=./
flask run
```

## Container
Change your directory to root folder, and then run:

### Execution (for tests)
```
docker-compose up
```