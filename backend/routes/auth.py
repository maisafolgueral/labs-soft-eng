from flask import Blueprint
from helper import authenticate

# Set current module
auth_bp = Blueprint('auth_bp', __name__)

@auth_bp.route('/auth', methods=['POST'])
def auth():
    return authenticate()