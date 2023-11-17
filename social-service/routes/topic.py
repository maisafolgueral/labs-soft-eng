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

        result = TopicSchema().dump(data)
            
        return jsonify(result)
    except AlreadyExistsError as err:
        abort(409, err.message)
    except ValidationError as err:
        abort(400, err.messages)
    except:
        session.rollback()
        abort(500)


@topic_bp.route('/topics/<id>', methods=['GET'])
@token_required
def getTopic(id):
    try:
        topic = session.query(TopicModel).filter_by(id=id).first()
        if topic is None:
            raise NoResultFound('Topic not found')

        to_dump = topic
        to_dump.total_followers = len(topic.followers)

        result = TopicSchema().dump(to_dump)
        
        return jsonify(result)
    
    except NoResultFound as err:
        abort(404, err.args)
    except:
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

        posts_json = []
        for post in posts:
            posts_json.append({
                'post': {
                    'id': post.id,
                    'title': post.title,
                    'content': post.content,
                    'date': post.created_at
                },
                'user': {
                    'id': post.user.id,
                    'name': post.user.name,
                    'surname': post.user.surname
                },
                'topic': {
                    'id': post.topic.id,
                    'subject': post.topic.subject
                }
            })

        return jsonify(posts_json)
    
    except NoResultFound as err:
        abort(404, err.args)
    except:
        session.rollback()
        abort(500)