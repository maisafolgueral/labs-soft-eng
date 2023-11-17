import json
from flask import Flask
from flask_cors import CORS
from werkzeug.exceptions import HTTPException
from flasgger import Swagger
from routes.admission import admission_bp

# Define application
app = Flask(__name__) 
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

# Define documentation
swagger = Swagger(app) 

# Routes
app.register_blueprint(admission_bp, url_prefix='/api')

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

if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
