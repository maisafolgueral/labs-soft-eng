from flask import Blueprint, jsonify, request, abort
from sqlalchemy.orm import sessionmaker
from sqlalchemy.exc import NoResultFound
from marshmallow import ValidationError
from config import engine
import json

from models import Topic as TopicModel

from schemas import Topic as TopicSchema
from schemas import Post as PostSchema
from schemas import FollowTopic as FollowTopicSchema

# Set current module
topic_bp = Blueprint('topic_bp', __name__)

# Create database session
session = sessionmaker(bind=engine)()


@topic_bp.route('/topics', methods=["GET"])
def getAllTopics():
    try:
        topics = session.query(TopicModel).all()
        result = TopicSchema(many=True).dump(topics)
        return jsonify(result)
    except:
        abort(500)


@topic_bp.route('/topics/<topic_id>/users', methods=["GET"])
def getAllTopicFollowers(topic_id):
    try:
        topic = session.query(TopicModel).filter_by(id=topic_id).first()
        if topic is None:
            abort(404, 'Topic not found')
        
        users = topic.followers
        users_data = FollowTopicSchema(many=True).dump(users)
        
        return jsonify(users_data)
    
    except NoResultFound:
        abort(404, 'Followers from this topic were not found')
    except:
        session.rollback()
        abort(500)


@topic_bp.route('/topics/<topic_id>/posts', methods=["GET"])
def getAllTopicPosts(topic_id):
    try:
        topic = session.query(TopicModel).filter_by(id=topic_id).first()
        if topic is None:
            abort(404, 'Topic not found')
        
        posts = topic.posts
        posts_data = PostSchema(many=True).dump(posts)
        
        return jsonify(posts_data)
    
    except NoResultFound:
        abort(404, 'Followers from this topic were not found')
    except:
        session.rollback()
        abort(500)