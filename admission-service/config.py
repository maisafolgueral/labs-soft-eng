'''
In this file, should be all
the global configuration
of the project
'''

# Database
USER = 'admin-hola'
PASSWORD = 'Digahola!23'
SERVER = 'cluster0.bdi4m6d.mongodb.net'
DATABASE = 'hola'
CONNECTION_STRING = F'mongodb+srv://{USER}:{PASSWORD}@{SERVER}/{DATABASE}?retryWrites=true&w=majority'