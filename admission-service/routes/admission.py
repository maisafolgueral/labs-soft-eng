from datetime import datetime
from flask import Blueprint, jsonify, request, abort
from marshmallow import ValidationError
from pymodm.errors import DoesNotExist
from exceptions import AlreadyExistsError
from helper import has_admission
from models import (
    Admission as AdmissionModel,
    Authorization as AuthorizationModel
)
from schemas import Admission as AdmissionSchema


# Set current module
admission_bp = Blueprint('admission_bp', __name__)

@admission_bp.route('/admissions', methods=['POST'])
def createAdmission():
    try:
        # Received data
        data = request.get_json()

        # Validate data
        AdmissionSchema().load(data)

        if has_admission(data['email']):
            raise AlreadyExistsError('E-mail already sent')
        
        # Validate token (if it was given)
        status = 0
        if 'token' in data and data['token'] != '' and data['token'] != None: 
            authorization = AuthorizationModel.objects.get({"token": data['token'], "was_used": False})
            authorization.was_used = True
            authorization.used_at = datetime.utcnow()
            authorization.save()
            status = 1

        # Persist data into the database
        admission = AdmissionModel(email=data['email'], status=status)
        admission.save()

        result = AdmissionSchema().dump(admission)

        return jsonify(result)

    except DoesNotExist as err:
        abort(404, "Token not found")
    except AlreadyExistsError as err:
        abort(409, err.message)
    except ValidationError as err:
        abort(400, err.messages)
    except:
        abort(500)

@admission_bp.route('/admissions/<code>', methods=['GET'])
def getAdmission(code):
    try:
        admission = AdmissionModel.objects.get({"code": code})
        
        result = AdmissionSchema().dump(admission)

        return jsonify(result)
    
    except DoesNotExist as err:
        abort(404, err.args)
    except:
        abort(500)
       
@admission_bp.route('/admissions/<code>', methods=['PUT'])
def updateAdmission(code):
    try:
        # Received data
        data = request.get_json()

        # Validate data
        AdmissionSchema().load(data)

        # Get user to be updated
        admission = AdmissionModel.objects.get({"code": code})
        
        admission.status = data['status']
        admission.save()

        # Dump user updated data
        result = AdmissionSchema().dump(admission)
            
        return jsonify(result)
    except ValidationError as err:
        abort(400, err.messages)
    except DoesNotExist as err:
        abort(404, err.args)
    except:
        abort(500)