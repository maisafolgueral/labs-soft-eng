from flask import Blueprint, jsonify, request, abort
from sqlalchemy.orm import sessionmaker
from sqlalchemy.exc import NoResultFound
from marshmallow import ValidationError
from config import engine
from models import Feedback as FeedbackModel
from schemas import Feedback as FeedbackSchema
import json

# Set current module
feedback_controller = Blueprint('feedback_controller', __name__)

# Create database session
session = sessionmaker(bind=engine)()

@feedback_controller.route('/feedbacks', methods=["POST"])
def sendFeedback():
    # todo
    return 'todo'