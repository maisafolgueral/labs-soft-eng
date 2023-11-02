import json
from flask import Flask
from flask_cors import CORS
from werkzeug.exceptions import HTTPException
from flasgger import Swagger
from routes.user import user_bp
from routes.topic import topic_bp
from routes.post import post_bp
from routes.feedback import feedback_bp
from routes.auth import auth_bp

# Define application
app = Flask(__name__) 
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

# Define documentation
swagger = Swagger(app) 

# Routes
app.register_blueprint(user_bp, url_prefix='/api')
app.register_blueprint(topic_bp, url_prefix='/api')
app.register_blueprint(post_bp, url_prefix='/api')
app.register_blueprint(feedback_bp, url_prefix='/api')
app.register_blueprint(auth_bp, url_prefix='/api')

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