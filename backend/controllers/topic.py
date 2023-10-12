from flask import Blueprint, jsonify, request, abort
from sqlalchemy.orm import sessionmaker
from sqlalchemy.exc import NoResultFound
from marshmallow import ValidationError
from config.database import engine
from models.user import Topic as TopicModel
from schemas.user import Topic as TopicSchema
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

@topic_controller.route('/topics/<topic_id>/users', methods=["GET"])
def getAllTopicFollowers():
    # todo
    return 'todo'

@topic_controller.route('/topics/<topic_id>/posts', methods=["GET"])
def getAllTopicPosts():
    # todo
    return 'todo'