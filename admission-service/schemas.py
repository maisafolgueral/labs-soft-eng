'''
In this file, it is set the
schema of input and output data
'''

from marshmallow import Schema, fields


'''
Schemas
'''
class Admission(Schema):
    email = fields.Email(required=True)
    token = fields.String()
    code = fields.String(dump_only=True)
    status = fields.Integer(required=True)
    created_at = fields.DateTime(dump_only=True)

class Authorization(Schema):
    token = fields.String(dump_only=True)
    was_used = fields.Boolean(dump_only=True)
    used_at = fields.DateTime(dump_only=True)
    created_at = fields.DateTime(dump_only=True)