from flask import Blueprint, jsonify, request, abort
from sqlalchemy.orm import sessionmaker
from sqlalchemy.exc import NoResultFound
from marshmallow import ValidationError
from config import engine

from models import (
    Post as PostModel,
    Reaction as ReactionModel
)

from schemas import (
    Post as PostSchema,
    Reaction as ReactionSchema
)

import json

# Set current module
post_bp = Blueprint('post_bp', __name__)

# Create database session
session = sessionmaker(bind=engine)()

@post_bp.route('/posts', methods=["POST"])
def createPost():
    try:
        # Received data
        data = request.get_json()

        # Validate data
        PostSchema().load(data)

        # Persist data into the database
        session.add(PostModel(**data))
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


@post_bp.route('/posts/<id>', methods=["GET"])
def getPost(id):
    try:
        post = session.query(PostModel).filter_by(id=id).first()
        
        if post is None:
            raise NoResultFound('Post not found')
        
        result = PostSchema().dump(post)
        return jsonify(result)
    
    except NoResultFound as err:
        abort(404, err.args)
    except:
        abort(500)


@post_bp.route('/posts/<id>', methods=["PUT"])
def updatePost(id):
    try:
        # Received data
        data = request.get_json()

        # Validate data
        PostSchema().load(data)

        # Get post 
        post = session.query(PostModel).filter_by(id=id)
        if post.first() is None:
            raise NoResultFound('Post not found')

        # Persist data into the database
        post.update(data)
        session.commit()

        # Dump post updated data
        result = PostSchema().dump(post.first())
            
        return jsonify(result)
    
    except ValidationError as err:
        abort(400, err.messages)
    
    except NoResultFound as err:
        abort(404, err.args)
    
    except:
        session.rollback()
        abort(500)

@post_bp.route('/posts/<id>', methods=["DELETE"])
def deletePost(id):
    try:
        # Get post to be deleted
        post = session.query(PostModel).filter_by(id=id)
        if post.first() is None:
            raise NoResultFound('Post not found')
        
        post.delete()
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

@post_bp.route('/posts/<post_id>/reactions', methods=["POST"])
def addReactionToPost(post_id):
    try:
        # Retireve the post from the database.
        p = session.query(PostModel).filter_by(id=post_id).first()
        if p is None:
            raise NoResultFound('Post Not Found')
        
        # Parse the reaction data from the request.
        data = request.get_json()
        ReactionSchema().load(data)
        
        # Create the new reaction for the post.
        reaction = ReactionModel(**data)
        session.add(reaction)
        session.flush()
        
        p.reactions.append(reaction)
        session.commit()
        
        return jsonify({
            'code': 201,
            'description': 'Successfully added reaction to the post'
        })
        
    except ValidationError as err:
        abort(400, err.messages)
    
    except NoResultFound as err:
        abort(404, err.args)
    
    except Exception as e:
        session.rollback()
        abort(500, 'Internal Server Error')

@post_bp.route('/posts/<post_id>/reactions', methods=["GET"])
def getAllPostReactions(post_id):
    try:
        post = session.query(PostModel).filter_by(id=post_id).first()
        if post is None:
            raise NoResultFound('Post not found')
        
        reactions = post.reactions
        result = ReactionSchema(many=True).dump(reactions)
        return jsonify(result)
    
    except NoResultFound as err:
        abort(404, err.args)
    except:
        abort(500)


@post_bp.route('/posts/<post_id>/reactions/<reaction_id>', methods=["GET"])
def getPostReaction(post_id, reaction_id):
    try:
        reaction = session.query(ReactionModel).filter_by(id=reaction_id, post_id=post_id).first()
        if reaction is None:
            raise NoResultFound('User to unfollow not found')
        
        result = ReactionSchema().dump(reaction)
        
        return jsonify(result)
    
    except NoResultFound as err:
        abort(404, err.args)
    except:
        abort(500)

# NOT WORKING. DON'T KNOW WHY. 
@post_bp.route('/posts/<post_id>/reactions/<reaction_id>', methods=["PUT"])
def updatePostReaction(post_id, reaction_id):
    try:
        # Received data
        data = request.get_json()
        data["post_id"] = post_id

        # Validate data
        ReactionSchema().load(data)

        post = session.query(PostModel).filter_by(id=post_id)
        if post.first() is None:
            raise NoResultFound('Post not found')

        reaction = session.query(ReactionModel).filter_by(id=reaction_id)
        if reaction.first() is None:
            raise NoResultFound('Reaction not found')
        
        reaction.update(data)
        session.commit()
        
        result = ReactionSchema().dump(reaction.first())
        
        return jsonify(result)
    
    except NoResultFound as err:
        abort(404, err.args)
    except:
        abort(500)

@post_bp.route('/posts/<post_id>/reactions/<reaction_id>', methods=["DELETE"])
def deletePostReaction(post_id, reaction_id):
    try:
        post = session.query(PostModel).filter_by(id=post_id)
        if post.first() is None:
            raise NoResultFound('Post not found')
        
        # Get user to be deleted
        reaction = session.query(ReactionModel).filter_by(id=reaction_id)
        if reaction.first() is None:
            raise NoResultFound('Reaction not found')
        
        reaction.delete()
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

@post_bp.route('/posts/<post_id>/comments', methods=["POST"])
def addCommentToPost(post_id):
    try:
        post = session.query(PostModel).filter_by(id=post_id).first()
        if post is None:
            raise NoResultFound('Post Not Found')
        
        data = request.get_json()
        CommentSchema().load(data)
        
        comment = CommentModel(**data)
        session.add(comment)
        session.flush()
        
        post.comments.append(comment)
        session.commit()
        
        return jsonify({
            'code': 201,
            'description': 'Successfully added comment to the post'
        })
        
    except ValidationError as err:
        abort(400, err.messages)
    
    except NoResultFound as err:
        abort(404, err.args)
    
    except Exception as e:
        session.rollback()
        abort(500, 'Internal Server Error')

@post_bp.route('/posts/<post_id>/comments', methods=["GET"])
def getAllPostComments(post_id):
    try:
        post = session.query(PostModel).filter_by(id=post_id).first()
        if post is None:
            raise NoResultFound('Post not found')
        
        comments = post.comments
        result = CommentSchema(many=True).dump(comments)
        return jsonify(result)
    
    except NoResultFound as err:
        abort(404, err.args)
    except:
        abort(500)

@post_bp.route('/posts/<post_id>/comments/<comment_id>', methods=["GET"])
def getPostComment(post_id, comment_id):
    try:
        comment = session.query(CommentModel).filter_by(id=comment_id, post_id=post_id).first()
        if comment is None:
            raise NoResultFound('Comment not found')
        
        result = CommentSchema().dump(comment)
        
        return jsonify(result)
    
    except NoResultFound as err:
        abort(404, err.args)
    except:
        abort(500)


@post_bp.route('/posts/<post_id>/comments/<comment_id>', methods=["PUT"])
def updatePostComment(post_id, comment_id):
    try:
        # Received data
        data = request.get_json()
        data["post_id"] = post_id

        # Validate data
        CommentSchema().load(data)

        post = session.query(PostModel).filter_by(id=post_id)
        if post.first() is None:
            raise NoResultFound('Post not found')

        comment = session.query(CommentModel).filter_by(id=comment_id)
        if comment.first() is None:
            raise NoResultFound('Comment not found')
        
        comment.update(data)
        session.commit()
        
        result = CommentSchema().dump(comment.first())
        
        return jsonify(result)
    
    except NoResultFound as err:
        abort(404, err.args)
    except:
        abort(500)

@post_bp.route('/posts/<post_id>/comments/<comment_id>', methods=["DELETE"])
def deletePostComment(post_id, comment_id):
    try:
        post = session.query(PostModel).filter_by(id=post_id)
        if post.first() is None:
            raise NoResultFound('Post not found')
        
        # Get user to be deleted
        comment = session.query(CommentModel).filter_by(id=comment_id)
        if comment.first() is None:
            raise NoResultFound('Comment not found')
        
        comment.delete()
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

