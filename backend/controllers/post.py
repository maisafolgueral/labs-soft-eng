from flask import Blueprint, jsonify, request, abort
from sqlalchemy.orm import sessionmaker
from sqlalchemy.exc import NoResultFound
from marshmallow import ValidationError
from api.config.database import engine
from api.models.user import PostModel
from api.schemas.user import PostSchema
import json

# Set current module
post_controller = Blueprint('post_controller', __name__)

# Create database session
session = sessionmaker(bind=engine)

@post_controller.route('/posts', methods=["GET"])
def getAllPosts():
    try:
        posts = session.query(PostModel).all()
        result = PostSchema(many=True).dump(posts)
        return jsonify(result)
    except:
        abort(500)

@post_controller.route('/posts/<id>', methods=["GET"])
def getPost(id):
    try:
        post = session.query(postModel).filter_by(id==id).first()
        result = PostSchema().dump(post)
        return jsonify(result)
    except NoResultFound:
        abort(404, 'Post not found')
    except:
        abort(500)

@post_controller.route('/posts', methods=["POST"])
def addPost():
    try:
        # URL data
        data = request.args

        # URL data args in json format
        data_json = json.loads(json.dumps(data))

        # Validate data
        PostSchema().load(data_json)

        # Persist data into the database
        session.add(PostModel(**data))
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

@post_controller.route('/posts/<id>', methods=["PUT"])
def updatePost(id):
    try:
        # URL data
        data = request.args

        # URL data args in json format
        data_json = json.loads(json.dumps(data))

        # Validate data
        PostSchema().load(data_json)

        # Persist data into the database
        session.query(PostModel).filter(session.id==id).update(data)
        session.commit()

        return jsonify({
            'code':'updated',
            'description':'Successfully updated'}), 200

    except ValidationError as err:
        abort(400, err.messages)
    except NoResultFound:
        abort(404, 'Post not found')
    except:
        session.rollback()
        abort(500)

@post_controller.route('/posts/<id>', methods=["DELETE"])
def deletePost(id):
    try:
        session.query(PostModel).filter_by(id=id).delete()
        session.commit()

        return jsonify({
            'code':'deleted',
            'description':'Successfully deleted'})

    except NoResultFound:
        abort(404, 'Post not found')
    except:
        session.rollback()
        session.abort(500)
