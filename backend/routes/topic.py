from flask import Blueprint, jsonify, request, abort
from sqlalchemy.orm import sessionmaker
from sqlalchemy.exc import NoResultFound
from marshmallow import ValidationError
from config import engine
from models import Topic as TopicModel
from schemas import Topic as TopicSchema
import json

# Set current module
topic_bp = Blueprint('topic_bp', __name__)

# Create database session
session = sessionmaker(bind=engine)

@topic_bp.route('/topics', methods=["GET"])
def getAllTopics():
    try:
        topics = session.query(TopicModel).all()
        result = TopicSchema(many=True).dump(topics)
        return jsonify(result)
    except:
        abort(500)

@topic_bp.route('/topics/<topic_id>/users', methods=["GET"])
def getAllTopicFollowers():
    # todo
    return 'todo'

@topic_bp.route('/topics/<topic_id>/posts', methods=["GET"])
def getAllTopicPosts():
    # todo
    return 'todo'