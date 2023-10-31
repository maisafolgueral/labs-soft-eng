import jwt, datetime
from functools import wraps
from sqlalchemy.orm import sessionmaker
from flask import Blueprint, jsonify, request
from werkzeug.security import generate_password_hash, check_password_hash

from config import engine, SECRET_KEY
from models import User as UserModel

session = sessionmaker(bind=engine)()

def user_by_email(email):
    try:
        return session.query(UserModel).filter_by(email=email).first()
    except:
        return None
    
def authenticate():
    auth = request.authorization
    if not auth or not auth.username or not auth.password:
        return jsonify({'message':'could not verify', 'WWW-Authenticate':'Basic auth="Authentication not provided"'}), 401
    
    user = user_by_email(auth.username)
    if not user:
        return jsonify({'message':'User not found', 'data':{}}), 401
    
    if user and user.password == auth.password:
        token = jwt.encode({'email':user.email, 'exp':datetime.datetime.now() + datetime.timedelta(hours=12)},
                           SECRET_KEY)
        return jsonify({'message':'Validate successfully', 'token':token, 
                        'exp':datetime.datetime.now() + datetime.timedelta(hours=12)})
        
    return jsonify({'message':'could not verify', 'WWW-Authenticate':'Basic auth="Login required"'}), 401
    
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.args.get('token')
        if not token:
            return jsonify({'message':'token is missing', 'data':{}}), 401
        try:
            data = jwt.decode(token, SECRET_KEY)
            current_user = user_by_email(email=data['email'])
        except:
            return jsonify({'message':'token is invalid or expired', 'data':{}}), 401
        return f(current_user, *args, **kwargs)
    return decorated