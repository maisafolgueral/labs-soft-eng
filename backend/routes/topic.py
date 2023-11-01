from flask import Blueprint, jsonify, abort
from sqlalchemy.orm import sessionmaker
from sqlalchemy.exc import NoResultFound
from config import engine
from helper import token_required
from models import Topic as TopicModel
from schemas import (
    Topic as TopicSchema,
    Post as PostSchema,
    User as UserSchema
)

# Set current module
topic_bp = Blueprint('topic_bp', __name__)

# Create database session
session = sessionmaker(bind=engine)()


@topic_bp.route('/topics', methods=['GET'])
@token_required
def getAllTopics():
    try:
        topics = session.query(TopicModel).all()
        result = TopicSchema(many=True).dump(topics)
        return jsonify(result)
    except:
        abort(500)


@topic_bp.route('/topics/<topic_id>/users', methods=['GET'])
@token_required
def getAllTopicFollowers(topic_id):
    try:
        topic = session.query(TopicModel).filter_by(id=topic_id).first()
        if topic is None:
            raise NoResultFound('Topic not found')
        
        users = topic.followers
        users_data = UserSchema(many=True).dump(users)
        
        return jsonify(users_data)
    
    except NoResultFound as err:
        abort(404, err.args)
    except:
        abort(500)


@topic_bp.route('/topics/<topic_id>/posts', methods=['GET'])
@token_required
def getAllTopicPosts(topic_id):
    try:
        topic = session.query(TopicModel).filter_by(id=topic_id).first()
        if topic is None:
            raise NoResultFound('Topic not found')
        
        posts = topic.posts
        posts_data = PostSchema(many=True).dump(posts)
        
        return jsonify(posts_data)
    
    except NoResultFound as err:
        abort(404, err.args)
    except:
        session.rollback()
        abort(500)