from flask import Blueprint, jsonify, request, abort
from sqlalchemy.orm import sessionmaker
from sqlalchemy.exc import NoResultFound
from marshmallow import ValidationError
from config.database import engine
from models.user import CommentModel
from schemas.user import CommentSchema
import json

# Set current module
comment_controller = Blueprint('comment_controller', __name__)

# Create database session
session = sessionmaker(bind=engine)

@comment_controller.route('/comments', methods=["GET"])
def getAllComments():
    try:
        comments = session.query(CommentModel).all()
        result = CommentSchema(many=True).dump(comments)
        return jsonify(result)
    except:
        abort(500)

@comment_controller.route('/comments/<id>', methods=["GET"])
def getComment(id):
    try:
        comment = session.query(CommentModel).filter_by(id==id).first()
        result = CommentSchema().dump(comment)
        return jsonify(result)
    except NoResultFound:
        abort(404, 'Comment not found')
    except:
        abort(500)

@comment_controller.route('/comments', methods=["POST"])
def addComment():
    try:
        # URL data
        data = request.args

        # URL data args in json format
        data_json = json.loads(json.dumps(data))

        # Validate data
        CommentSchema().load(data_json)

        # Persist data into the database
        session.add(CommentModel(**data))
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

@comment_controller.route('/comments/<id>', methods=["PUT"])
def updateComment(id):
    try:
        # URL data
        data = request.args

        # URL data args in json format
        data_json = json.loads(json.dumps(data))

        # Validate data
        CommentSchema().load(data_json)

        # Persist data into the database
        session.query(CommentModel).filter(session.id==id).update(data)
        session.commit()

        return jsonify({
            'code':'updated',
            'description':'Successfully updated'}), 200

    except ValidationError as err:
        abort(400, err.messages)
    except NoResultFound:
        abort(404, 'Comment not found')
    except:
        session.rollback()
        abort(500)

@comment_controller.route('/comments/<id>', methods=["DELETE"])
def deleteComment(id):
    try:
        session.query(CommentModel).filter_by(id=id).delete()
        session.commit()

        return jsonify({
            'code':'deleted',
            'description':'Successfully deleted'})

    except NoResultFound:
        abort(404, 'Comment not found')
    except:
        session.rollback()
        session.abort(500)
