from flask import Blueprint, jsonify, request, abort
from sqlalchemy import text
from sqlalchemy.orm import sessionmaker
from sqlalchemy.exc import NoResultFound
from marshmallow import ValidationError
from config import engine
from helper import token_required
from exceptions import AlreadyExistsError
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


@topic_bp.route('/topics', methods=['POST'])
@token_required
def createTopic():
    try:
        # Received data
        data = request.get_json()

        # Validate data
        TopicSchema().load(data)

        # Check if topic already exists
        topic = session.query(TopicModel).filter_by(subject=data['subject']).first()
        if topic:
            raise AlreadyExistsError('Topic already exists')

        # Persist data into the database
        session.add(TopicModel(**data))
        session.commit()
            
        return jsonify({
            'code': 201,
            'description': 'Successfully created'
        })
    except AlreadyExistsError as err:
        abort(409, err.message)
    except ValidationError as err:
        abort(400, err.messages)
    except:
        session.rollback()
        abort(500)


@topic_bp.route('/topics', methods=['GET'])
@token_required
def getAllTopics():
    try:
        conn = engine.connect()
        
        stmt = text("SELECT T.id, T.subject, T.created_at, COUNT(DISTINCT F.follower_id) AS total_followers FROM topic T LEFT JOIN follow_topic F ON T.id=F.topic_id GROUP BY T.id")

        result = conn.execute(stmt)

        topics = result.fetchall()

        conn.close()

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