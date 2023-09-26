from flask import Blueprint, jsonify, request, abort
from sqlalchemy.orm import sessionmaker
from sqlalchemy.exc import NoResultFound
from marshmallow import ValidationError
from api.config.database import engine
from api.models.user import UserModel
from api.schemas.user import UserSchema
import json

# Set current module
user_controller = Blueprint('user_controller', __name__)

# Create database session
session = sessionmaker(bind=engine)()

@user_controller.route('/users', methods=["GET"])
def getAllUsers():
    try:
        users = session.query(UserModel).all() 
        result = UserSchema(many=True).dump(users)
        return jsonify(result)
    except:
        abort(500)

@user_controller.route('/users/<id>', methods=["GET"])
def getUser(id):
    try:
        user = session.query(UserModel).filter_by(id==id).first()
        result = UserSchema().dump(user)
        return jsonify(result)
    except NoResultFound:
        abort(404, 'User not found')
    except:
        abort(500)

@user_controller.route('/users', methods=["POST"])
def addUser():
    try:
        # URL data
        data = request.args

        # URL data args in json format
        data_json = json.loads(json.dumps(data))

        # Validate data
        UserSchema().load(data_json)

        # Persist data into the database
        session.add(UserModel(**data))
        session.commit()
            
        return jsonify({
            'code':'created',
            'description': 'Successfully created'
        })
    except ValidationError as err:
        abort(400, err.messages)
    except:
        session.rollback()
        abort(500)
        
@user_controller.route('/users/<id>', methods=["PUT"])
def updateUser(id):
    try:
        # URL data
        data = request.args

        # URL data args in json format
        data_json = json.loads(json.dumps(data))

        # Validate data
        UserSchema().load(data_json)

        # Persist data into the database
        session.query(UserModel).filter(session.id==id).update(data)
        session.commit()
            
        return jsonify({
            'code':'updated',
            'description': 'Successfully updated'
        }), 200
    except ValidationError as err:
        abort(400, err.messages)
    except NoResultFound:
        abort(404, 'User not found')
    except:
        session.rollback()
        abort(500)

@user_controller.route('/users/<id>', methods=["DELETE"])
def deleteUser(id):
    try:
        session.query(UserModel).filter_by(id=id).delete()
        session.commit()
            
        return jsonify({
            'code':'deleted',
            'description': 'Successfully deleted'
        })
    except NoResultFound:
        abort(404, 'User not found')
    except:
        session.rollback()
        abort(500)