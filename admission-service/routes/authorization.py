from flask import Blueprint, jsonify, abort
from pymodm.errors import DoesNotExist
from helper import generate_random_string
from models import Authorization as AuthorizationModel
from schemas import Authorization as AuthorizationSchema


# Set current module
authorization_bp = Blueprint('authorization_bp', __name__)

@authorization_bp.route('/authorizations', methods=['POST'])
def generateAuthorization():
    try:
        token = generate_random_string()

        authorization = AuthorizationModel(token=token)
        authorization.save()

        result = AuthorizationSchema().dump(authorization)

        return jsonify(result)
    except:
        abort(500)

@authorization_bp.route('/authorizations/<token>', methods=['GET'])
def getAuthorization(token):
    try:
        authorization = AuthorizationModel.objects.get({"token": token})
        
        result = AuthorizationSchema().dump(authorization)

        return jsonify(result)
    except DoesNotExist as err:
        abort(404, err.args)
    except:
        abort(500)