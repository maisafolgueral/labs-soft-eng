from flask import Blueprint, jsonify, request, abort
from sqlalchemy.orm import sessionmaker
from sqlalchemy.exc import NoResultFound
from marshmallow import ValidationError
from config.database import engine
from models.user import FollowTopicModel
from schemas.user import FollowTopicSchema
import json

# Set current module
followtopic_controller = Blueprint('followtopic_controller', __name__)

# Create database session
session = sessionmaker(bind=engine)

@followtopic_controller.route('/followtopics', methods=["GET"])
def getAllFollowTopics():
    try:
        followtopics = session.query(FollowTopicModel).all()
        result = FollowTopicSchema(many=True).dump(followtopics)
        return jsonify(result)
    except:
        abort(500)

@followtopic_controller.route('/followtopics/<id>', methods=["GET"])
def getFollowedTopics(id):
    try:
        followtopic = session.query(FollowTopicModel).filter_by(follower_id==id).first()
        result = FollowTopicSchema().dump(followtopic)
        return jsonify(result)
    except NoResultFound:
        abort(404, 'FollowTopic not found')
    except:
        abort(500)

#REVIEW
@followtopic_controller.route('/followtopics', methods=["POST"])
def addFollowTopic():
    try:
        # URL data
        data = request.args

        # URL data args in json format
        data_json = json.loads(json.dumps(data))

        # Validate data
        FollowTopicSchema().load(data_json)

        # Persist data into the database
        session.add(FollowTopicModel(**data))
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
@followtopic_controller.route('/followtopics/<id>', methods=["PUT"])
def updateFollowTopic(id):
    try:
        # URL data
        data = request.args

        # URL data args in json format
        data_json = json.loads(json.dumps(data))

        # Validate data
        FollowTopicSchema().load(data_json)

        # Persist data into the database
        session.query(FollowTopicModel).filter(session.id==id).update(data)
        session.commit()

        return jsonify({
            'code':'updated',
            'description':'Successfully updated'}), 200

    except ValidationError as err:
        abort(400, err.messages)
    except NoResultFound:
        abort(404, 'FollowTopic not found')
    except:
        session.rollback()
        abort(500)

@followtopic_controller.route('/followtopics/<follower_id>/topics', methods=["DELETE"])
def deleteFollowTopic(follower_id, topic_id):
    try:
        session.query(FollowTopicModel).filter_by(follower_id=follower_id and topic_id=topic_id).delete()
        session.commit()

        return jsonify({
            'code':'deleted',
            'description':'Successfully deleted'})

    except NoResultFound:
        abort(404, 'FollowTopic not found')
    except:
        session.rollback()
        session.abort(500)
