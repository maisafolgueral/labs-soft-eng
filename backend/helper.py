'''
In this file, it is set
functions that are used
in specific contexts
'''
import jwt, datetime
from functools import wraps
from sqlalchemy.orm import sessionmaker
from flask import jsonify, request
from config import engine, SECRET_KEY
from models import User as UserModel

session = sessionmaker(bind=engine)()

def get_user_by_email(email):
    try:
        return session.query(UserModel).filter_by(email=email).first()
    except:
        return None

# Authenticates user, giving him JWT token to access the API 
def authenticate():
    auth = request.authorization
    if not auth or not auth.username or not auth.password:
        return jsonify({
            'message':'Login required'
        }), 401
    
    user = get_user_by_email(auth.username)
    if not user:
        return jsonify({
            'message':'User not found'
        }), 401
    
    if user.check_password(auth.password):
        token = jwt.encode(
            {
                'email':user.email, 
                'exp':datetime.datetime.now() + datetime.timedelta(hours=12)
            }, 
            SECRET_KEY, 
            algorithm='HS256'
        )
        return jsonify({
            'message':'Validate successfully', 
            'token':token, 
            'exp':datetime.datetime.now() + datetime.timedelta(hours=12),
            'user': {
                'id': user.id,
                'name': user.name
            }
        })
        
    return jsonify({
        'message':'Login required'
    }), 401

# Decorator to restrict access to API routes
# (Only users with a token can have access)
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        authorization = request.headers.get('Authorization')
        if not authorization:
            return jsonify({
                'message':'Token is missing', 
                'data':{}
            }), 401
        
        try:
            token = authorization.split(' ')[1]
            # for future use:
            data = jwt.decode(token, SECRET_KEY, algorithms='HS256')
            current_user = get_user_by_email(email=data['email'])
        except:
            return jsonify({
                'message':'Token is invalid or expired', 
                'data':{}
            }), 401
        
        return f(*args, **kwargs)
    
    return decorated