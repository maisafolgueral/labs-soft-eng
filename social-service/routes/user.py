import random
from flask import Blueprint, jsonify, request, abort
from sqlalchemy import text
from sqlalchemy.orm import sessionmaker
from sqlalchemy.exc import NoResultFound
from marshmallow import ValidationError
from config import engine
from helper import token_required
from adapters.apis.social import (
    get_admission,
    update_admission
)
from exceptions import AlreadyExistsError
from models import (
    User as UserModel,
    Topic as TopicModel
)
from schemas import (
    User as UserSchema,
    Topic as TopicSchema,
    Post as PostSchema
)

# Set current module
user_bp = Blueprint('user_bp', __name__)

# Create database session
session = sessionmaker(bind=engine)()

@user_bp.route('/users', methods=['POST'])
def createUser():
    try:
        # Received data
        data = request.get_json()

        # Validate data
        UserSchema().load(data)

        code = data['code']
        data.pop('code') # remove code key to persist data

        # Check if user was authorized to use the social network
        admission = get_admission(code)
        if 'error' in admission:
            if admission['error'] == 404:
                raise NoResultFound('Code not found')
            else:
                # error 500
                raise
        if admission['status'] != 1:
            raise

        # Check if user already exists
        user = session.query(UserModel).filter_by(email=admission['email']).first()
        if user:
            raise AlreadyExistsError('Email already in use') 

        # Persist data into the database
        new_user = UserModel(**data)
        session.add(new_user)
        session.flush()
        session.commit()

        update_admission(code, admission['email'])

        result = UserSchema().dump(new_user)

        return jsonify(result)
    except AlreadyExistsError as err:
        abort(409, err.message)
    except ValidationError as err:
        abort(400, err.messages)
    except:
        session.rollback()
        abort(500)

@user_bp.route('/users/<id>', methods=['GET'])
@token_required
def getUser(id):
    try:
        user = session.query(UserModel).filter_by(id=id).first()
        if user is None:
            raise NoResultFound('User not found')
        
        result = UserSchema().dump(user)

        return jsonify(result)
    
    except NoResultFound as err:
        abort(404, err.args)
    except:
        abort(500)

@user_bp.route('/users/<id>', methods=['PUT'])
@token_required
def updateUser(id):
    try:
        # Received data
        data = request.get_json()

        # Validate data
        UserSchema().load(data)

        # Get user to be updated
        user = session.query(UserModel).filter_by(id=id)
        if user.first() is None:
            raise NoResultFound('User not found')

        if 'password' in data:
            is_pass = user.first().check_password(data['newPassword'])
            if is_pass is None:
                raise ValidationError("Incorrect password")
            user.first().password = user.first().hash_password(data['newPassword'])
        else:
            user.update(data)

        session.commit()

        result = UserSchema().dump(user.first())
            
        return jsonify(result)
    except ValidationError as err:
        abort(400, err.messages)
    
    except NoResultFound as err:
        abort(404, err.args)
    
    except:
        session.rollback()
        abort(500)

@user_bp.route('/users/<id>', methods=['DELETE'])
@token_required
def deleteUser(id):
    try:
        # Get user to be deleted
        user = session.query(UserModel).filter_by(id=id)
        if user.first() is None:
            raise NoResultFound('User not found')
        
        user.delete()
        session.commit()
            
        return jsonify({
            'code': 200,
            'description': 'Successfully deleted'
        })
    except NoResultFound as err:
        abort(404, err.args)
    except:
        session.rollback()
        abort(500)

@user_bp.route('/users/<user_id>/followers', methods=['GET'])
@token_required
def getAllUserFollowers(user_id):
    try:
        user = session.query(UserModel).filter_by(id=user_id).first()
        if user is None:
            raise NoResultFound('User not found')
        
        followers = user.followers
        result = UserSchema(many=True).dump(followers)

        return jsonify(result)
    
    except NoResultFound as err:
        abort(404, err.args)
    except:
        abort(500)

@user_bp.route('/users/<user_id>/followers/<follower_id>', methods=['DELETE'])
@token_required
def deleteUserFollower(user_id, follower_id):
    try:
        # Get user who is followed
        user = session.query(UserModel).filter_by(id=user_id).first()
        if user is None:
            raise NoResultFound('User not found')
        
        # Get user who follows
        follower = session.query(UserModel).filter_by(id=follower_id).first()
        if follower is None:
            raise NoResultFound('User to unfollow not found')
        
        # Remove relationship
        user.followers.remove(follower)

        # Persist into the database
        session.commit()
            
        return jsonify({
            'code': 200,
            'description': 'Successfully deleted'
        })
    
    except NoResultFound as err:
        abort(404, err.args)
    
    except:
        session.rollback()
        abort(500)

# Who does the user follows.
@user_bp.route('/users/<user_id>/followed', methods=['GET'])
@token_required
def getAllUserFollowed(user_id):
    try:
        user = session.query(UserModel).filter_by(id=user_id).first()
        if user is None:
            raise NoResultFound('User not found')
        
        followed = user.followed
        result = UserSchema(many=True).dump(followed)

        return jsonify(result)
    
    except NoResultFound as err:
        abort(404, err.args)
    except:
        abort(500)

@user_bp.route('/users/<user_id>/followed/<followed_id>', methods=['PUT'])
@token_required
def followUser(user_id, followed_id):
    try:
        # Get user that will follow
        user = session.query(UserModel).filter_by(id=user_id).first()
        if user is None:
            raise NoResultFound('User not found')
        
        # Get user that will be followed
        followed = session.query(UserModel).filter_by(id=followed_id).first()
        if followed is None:
            raise NoResultFound('User to follow not found')
        
        # Create relationship
        user.followed.append(followed)

        # Persist into the database
        session.commit()
            
        return jsonify({
            'code': 201,
            'description': 'Successfully created'
        })
    except ValidationError as err:
        abort(400, err.messages)
    except NoResultFound as err:
        abort(404, err.args)
    except:
        session.rollback()
        abort(500)

@user_bp.route('/users/<user_id>/followed/<followed_id>', methods=['DELETE'])
@token_required
def unfollowUser(user_id, followed_id):
    try:
        # Get user that follows
        user = session.query(UserModel).filter_by(id=user_id).first()
        if user is None:
            raise NoResultFound('User not found')
        
        # Get user that is followed
        followed = session.query(UserModel).filter_by(id=followed_id).first()
        if followed is None:
            raise NoResultFound('User to unfollow not found')
        
        # Remove relationship
        user.followed.remove(followed)

        # Persist into the database
        session.commit()
            
        return jsonify({
            'code': 200,
            'description': 'Successfully deleted'
        })
    except NoResultFound as err:
        abort(404, err.args)
    except:
        session.rollback()
        abort(500)

# Topics that the user follows.
@user_bp.route('/users/<user_id>/topics', methods=['GET'])
@token_required
def getAllUserTopics(user_id):
    try:
        user = session.query(UserModel).filter_by(id=user_id).first()
        if user is None:
            raise NoResultFound('User not found') 
        
        topics = user.topics
        result = TopicSchema(many=True).dump(topics)

        return jsonify(result)
    
    except NoResultFound as err:
        abort(404, err.args)
    except:
        abort(500)

@user_bp.route('/users/<user_id>/topics/<topic_id>', methods=['PUT'])
@token_required
def followTopic(user_id, topic_id):
    try:
        user = session.query(UserModel).filter_by(id=user_id).first()
        if user is None:
            raise NoResultFound('User not found')
        
        topic = session.query(TopicModel).filter_by(id=topic_id).first()
        if topic is None:
            raise NoResultFound('Topic not found')
        
        user.topics.append(topic)

        session.commit()
            
        return jsonify({
            'code': 201,
            'description': 'Successfully created'
        })
    except ValidationError as err:
        abort(400, err.messages)
    except NoResultFound as err:
        abort(404, err.args)
    except:
        session.rollback()
        abort(500)

@user_bp.route('/users/<user_id>/topics/<topic_id>', methods=['DELETE'])
@token_required
def unfollowTopic(user_id, topic_id):
    try:
        user = session.query(UserModel).filter_by(id=user_id).first()
        if user is None:
            raise NoResultFound('User not found')
        
        topic = session.query(TopicModel).filter_by(id=topic_id).first()
        if topic is None:
            raise NoResultFound('Topic not found')
        
        user.topics.remove(topic)

        session.commit()
            
        return jsonify({
            'code': 200,
            'description': 'Successfully deleted'
        })
    except NoResultFound as err:
        abort(404, err.args)
    except:
        session.rollback()
        abort(500)

# Posts from the user.
@user_bp.route('/users/<user_id>/posts', methods=['GET'])
@token_required
def getAllUserPosts(user_id):
    try:
        user = session.query(UserModel).filter_by(id=user_id).first()
        if user is None:
            raise NoResultFound('User not found')
        
        posts = user.posts

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
        abort(500)


@user_bp.route('/users/<id>/timeline', methods=['GET'])
@token_required
def generateTimeline(id):
    try:
        conn = engine.connect()
        
        stmt = text(f'SELECT DISTINCT ON (P.id) P.id, P.title, P.content, P.created_at, U.id as user_id, U.name as user_name, U.surname as user_surname, T.id as topic_id, T.subject as topic_subject FROM post P JOIN "user" U ON P.user_id = U.id JOIN topic T ON P.topic_id = T.id JOIN follow_topic FT ON FT.topic_id = T.id WHERE FT.follower_id = {id} ORDER BY P.id')

        result = conn.execute(stmt)

        posts = result.fetchall()

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
                    'id': post.user_id,
                    'name': post.user_name,
                    'surname': post.user_surname
                },
                'topic': {
                    'id': post.topic_id,
                    'subject': post.topic_subject
                }
            })

        conn.close()

        random.shuffle(posts_json)

        return jsonify(posts_json)
    except:
        abort(500)