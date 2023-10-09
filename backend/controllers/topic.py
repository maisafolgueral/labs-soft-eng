from flask import Blueprint, jsonify, request, abort
from sqlalchemy.orm import sessionmaker
from sqlalchemy.exc import NoResultFound
from marshmallow import ValidationError
from api.config.database import engine
from api.models.user import TopicModel
from api.schemas.user import TopicSchema
import json

# Set current module
topic_controller = Blueprint('topic_controller', __name__)

# Create database session
session = sessionmaker(bind=engine)

@topic_controller.route('/topics', methods=["GET"])
def getAllTopics():
    try:
        topics = session.query(TopicModel).all()
        result = TopicSchema(many=True).dump(topics)
        return jsonify(result)
    except:
        abort(500)

@topic_controller.route('/topics/<id>', methods=["GET"])
def getTopic(id):
    try:
        topic = session.query(TopicModel).filter_by(id==id).first()
        result = TopicSchema().dump(topic)
        return jsonify(result)
    except NoResultFound:
        abort(404, 'Topic not found')
    except:
        abort(500)

@topic_controller.route('/topics', methods=["POST"])
def addTopic():
    try:
        # URL data
        data = request.args

        # URL data args in json format
        data_json = json.loads(json.dumps(data))

        # Validate data
        TopicSchema().load(data_json)

        # Persist data into the database
        session.add(TopicModel(**data))
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

@topic_controller.route('/topics/<id>', methods=["PUT"])
def updateTopic(id):
    try:
        # URL data
        data = request.args

        # URL data args in json format
        data_json = json.loads(json.dumps(data))

        # Validate data
        TopicSchema().load(data_json)

        # Persist data into the database
        session.query(TopicModel).filter(session.id==id).update(data)
        session.commit()

        return jsonify({
            'code':'updated',
            'description':'Successfully updated'}), 200

    except ValidationError as err:
        abort(400, err.messages)
    except NoResultFound:
        abort(404, 'Topic not found')
    except:
        session.rollback()
        abort(500)

@topic_controller.route('/topics/<id>', methods=["DELETE"])
def deleteTopic(id):
    try:
        session.query(TopicModel).filter_by(id=id).delete()
        session.commit()

        return jsonify({
            'code':'deleted',
            'description':'Successfully deleted'})

    except NoResultFound:
        abort(404, 'Topic not found')
    except:
        session.rollback()
        session.abort(500)
