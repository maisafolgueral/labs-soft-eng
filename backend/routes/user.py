from flask import Blueprint, jsonify, request, abort
from sqlalchemy import select
from sqlalchemy.orm import sessionmaker
from sqlalchemy.exc import NoResultFound
from marshmallow import ValidationError
from config import engine
from models import User as UserModel
from schemas import (
    User as UserSchema,
    Topic as TopicSchema,
    Post as PostSchema,
    FollowUser as FollowUserSchema
)

# Set current module
user_bp = Blueprint('user_bp', __name__)

# Create database session
session = sessionmaker(bind=engine)()

@user_bp.route('/users', methods=["POST"])
def createUser():
    try:
        # Received data
        data = request.get_json()

        # Validate data
        UserSchema().load(data)

        # Persist data into the database
        session.add(UserModel(**data))
        session.commit()
            
        return jsonify({
            'code': 201,
            'description': 'Successfully created'
        })
    except ValidationError as err:
        abort(400, err.messages)
    except:
        session.rollback()
        abort(500)

@user_bp.route('/users/<id>', methods=["GET"])
def getUser(id):
    try:
        user = session.query(UserModel).filter_by(id=id).first()
        if user is None:
            raise NoResultFound
        result = UserSchema().dump(user)
        return jsonify(result)
    except NoResultFound:
        abort(404, 'User not found')
    except:
        abort(500)
       
@user_bp.route('/users/<id>', methods=["PUT"])
def updateUser(id):
    try:
        # Received data
        data = request.get_json()

        # Validate data
        UserSchema().load(data)

        # Persist data into the database
        session.query(UserModel).filter_by(id=id).update(data)
        session.commit()
            
        return jsonify({
            'code': 200,
            'description': 'Successfully updated'
        })
    except ValidationError as err:
        abort(400, err.messages)
    except NoResultFound:
        abort(404, 'User not found')
    except:
        session.rollback()
        abort(500)

@user_bp.route('/users/<id>', methods=["DELETE"])
def deleteUser(id):
    try:
        session.query(UserModel).filter_by(id=id).delete()
        session.commit()
            
        return jsonify({
            'code': 200,
            'description': 'Successfully deleted'
        })
    except NoResultFound:
        abort(404, 'User not found')
    except:
        session.rollback()
        abort(500)

@user_bp.route('/users/<user_id>/followers', methods=["GET"])
def getAllUserFollowers(user_id):
    try:
        user = session.query(UserModel).filter_by(id=user_id).first()
        if user is None:
            raise NoResultFound
        
        followers = user.followers
        result = UserSchema(many=True).dump(followers)

        return jsonify(result)
    
    except NoResultFound:
        abort(404, 'User not found')
    except:
        abort(500)

@user_bp.route('/users/<user_id>/followers/<follower_id>', methods=["DELETE"])
def deleteUserFollower(user_id, follower_id):
    # TODO
    return 'TODO'

# Who does the user follows.
@user_bp.route('/users/<user_id>/followed', methods=["GET"])
def getAllUserFollowed(user_id):
    try:
        user = session.query(UserModel).filter_by(id=user_id).first()
        if user is None:
            raise NoResultFound
        
        followed = user.followed
        result = UserSchema(many=True).dump(followed)

        return jsonify(result)
    
    except NoResultFound:
        abort(404, 'User not found')
    except:
        abort(500)

@user_bp.route('/users/<user_id>/followed/<followed_id>', methods=["PUT"])
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

        # Persist data into the database
        session.add(user)
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

@user_bp.route('/users/<user_id>/followed/<followed_id>', methods=["DELETE"])
def unfollowUser(user_id, followed_id):
    # TODO
    return 'TODO'

# Topics that the user follows.
@user_bp.route('/users/<user_id>/topics', methods=["GET"])
def getAllUserFollowedTopics(user_id):
    try:
        user = session.query(UserModel).filter_by(id=user_id).first()
        if user is None:
            raise NoResultFound   
        
        topics = user.topics
        result = TopicSchema(many=True).dump(topics)

        return jsonify(result)
    
    except NoResultFound:
        abort(404, 'User not found')
    except:
        abort(500)

@user_bp.route('/users/<user_id>/topics/<topic_id>', methods=["PUT"])
def followTopic(user_id):
    # TODO
    return 'TODO'

@user_bp.route('/users/<user_id>/topics/<topic_id>', methods=["DELETE"])
def unfollowTopic(user_id):
    # TODO
    return 'TODO'

# Posts from the user.
@user_bp.route('/users/<user_id>/posts', methods=["GET"])
def getAllUserPosts(user_id):
    try:
        user = session.query(UserModel).filter_by(id=user_id).first()
        if user is None:
            raise NoResultFound    
        
        posts = user.posts
        result = PostSchema(many=True).dump(posts)

        return jsonify(result)
    
    except NoResultFound:
        abort(404, 'User not found')
    except:
        abort(500)