from flask import Blueprint, jsonify, request, abort
from sqlalchemy.orm import sessionmaker
from sqlalchemy.exc import NoResultFound
from marshmallow import ValidationError
from config import engine
from models import Feedback as FeedbackModel
from schemas import Feedback as FeedbackSchema
import json

# Set current module
feedback_bp = Blueprint('feedback_bp', __name__)

# Create database session
session = sessionmaker(bind=engine)()

@feedback_bp.route('/feedbacks', methods=["POST"])
def sendFeedback():
    try:
        # Received data
        data = request.get_json()

        # Validate data
        FeedbackSchema().load(data)

        # Persist data into the database
        session.add(FeedbackModel(**data))
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


@feedback_bp.route('/feedbacks/<id>', methods=["GET"])
def getFeedback(id):
    try:
        feedback = session.query(FeedbackModel).filter_by(id=id).first()
        if feedback is None:
            raise NoResultFound('Post not found')
        
        result = FeedbackSchema().dump(feedback)
        return jsonify(result)
    
    except NoResultFound as err:
        abort(404, err.args)
    except:
        abort(500)