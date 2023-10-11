from flask import Blueprint, jsonify, request, abort
from sqlalchemy.orm import sessionmaker
from sqlalchemy.exc import NoResultFound
from marshmallow import ValidationError
from api.config.database import engine
from api.models.user import FollowUserModel
from api.schemas.user import FollowUserSchema
import json

# Set current module
followuser_controller = Blueprint('followuser_controller', __name__)

# Create database session
session = sessionmaker(bind=engine)

@followuser_controller.route('/followusers', methods=["GET"])
def getAllFollowUsers():
    try:
        followusers = session.query(FollowUserModel).all()
        result = FollowUserSchema(many=True).dump(followusers)
        return jsonify(result)
    except:
        abort(500)

@followuser_controller.route('/followusers/<id>', methods=["GET"])
def getFollowedUsers(id):
    try:
        followuser = session.query(FollowUserModel).filter_by(follower_id==id).first()
        result = FollowUserSchema().dump(followuser)
        return jsonify(result)
    except NoResultFound:
        abort(404, 'FollowUser not found')
    except:
        abort(500)

#REVIEW
@followuser_controller.route('/followusers', methods=["POST"])
def addFollowUser():
    try:
        # URL data
        data = request.args

        # URL data args in json format
        data_json = json.loads(json.dumps(data))

        # Validate data
        FollowUserSchema().load(data_json)

        # Persist data into the database
        session.add(FollowUserModel(**data))
        session.commit()

        return jsonify({
            'code':'created',
            'description':'Successfully created'
        })
    except ValidationError as err:
        abort(400, err.messages)
    except:
        session.rollback()
        abort(500)

#REVIEW
@followuser_controller.route('/followusers/<id>', methods=["PUT"])
def updateFollowUser(id):
    try:
        # URL data
        data = request.args

        # URL data args in json format
        data_json = json.loads(json.dumps(data))

        # Validate data
        FollowUserSchema().load(data_json)

        # Persist data into the database
        session.query(FollowUserModel).filter(session.id==id).update(data)
        session.commit()

        return jsonify({
            'code':'updated',
            'description':'Successfully updated'}), 200

    except ValidationError as err:
        abort(400, err.messages)
    except NoResultFound:
        abort(404, 'FollowUser not found')
    except:
        session.rollback()
        abort(500)

@followuser_controller.route('/followusers/<follower_id,followed_id>', methods=["DELETE"])
def deleteFollowUser(follower_id, followed_id):
    try:
        session.query(FollowUserModel).filter_by(follower_id=follower_id and followed_id=followed_id).delete()
        session.commit()

        return jsonify({
            'code':'deleted',
            'description':'Successfully deleted'})

    except NoResultFound:
        abort(404, 'FollowUser not found')
    except:
        session.rollback()
        session.abort(500)
