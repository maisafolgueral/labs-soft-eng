from flask import Blueprint, jsonify, request, abort
from sqlalchemy.orm import sessionmaker
from sqlalchemy.exc import NoResultFound
from marshmallow import ValidationError
from api.config.database import engine
from api.models.user import ReactionModel
from api.schemas.user import ReactionSchema
import json

# Set current module
Reaction_controller = Blueprint('Reaction_controller', __name__)

# Create database session
session = sessionmaker(bind=engine)

@reaction_controller.route('/reactions', methods=["GET"])
def getAllReactions():
    try:
        reactions = session.query(ReactionModel).all()
        result = ReactionSchema(many=True).dump(reactions)
        return jsonify(result)
    except:
        abort(500)

@reaction_controller.route('/reactions/<id>', methods=["GET"])
def getReaction(id):
    try:
        reaction = session.query(ReactionModel).filter_by(id==id).first()
        result = ReactionSchema().dump(reaction)
        return jsonify(result)
    except NoResultFound:
        abort(404, 'Reaction not found')
    except:
        abort(500)

@reaction_controller.route('/reactions', methods=["POST"])
def addReaction():
    try:
        # URL data
        data = request.args

        # URL data args in json format
        data_json = json.loads(json.dumps(data))

        # Validate data
        ReactionSchema().load(data_json)

        # Persist data into the database
        session.add(ReactionModel(**data))
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

@reaction_controller.route('/reactions/<id>', methods=["PUT"])
def updateReaction(id):
    try:
        # URL data
        data = request.args

        # URL data args in json format
        data_json = json.loads(json.dumps(data))

        # Validate data
        ReactionSchema().load(data_json)

        # Persist data into the database
        session.query(ReactionModel).filter(session.id==id).update(data)
        session.commit()

        return jsonify({
            'code':'updated',
            'description':'Successfully updated'}), 200

    except ValidationError as err:
        abort(400, err.messages)
    except NoResultFound:
        abort(404, 'Reaction not found')
    except:
        session.rollback()
        abort(500)

@reaction_controller.route('/reactions/<id>', methods=["DELETE"])
def deleteReaction(id):
    try:
        session.query(ReactionModel).filter_by(id=id).delete()
        session.commit()

        return jsonify({
            'code':'deleted',
            'description':'Successfully deleted'})

    except NoResultFound:
        abort(404, 'Reaction not found')
    except:
        session.rollback()
        session.abort(500)
