from flask import Flask
from werkzeug.exceptions import HTTPException
from flasgger import Swagger
from controllers.user import user_controller
import json

# Define application
app = Flask(__name__) 

# Define documentation
swagger = Swagger(app) 

# Controllers
app.register_blueprint(user_controller, url_prefix='/api')

# Global generic error handler
@app.errorhandler(HTTPException)
def handle_exception(e):
    response = e.get_response()
    response.data = json.dumps({
        'code': e.code,
        'name': e.name,
        'description': e.description,
    })
    response.content_type = 'application/json'
    return response