'''
In this file, should be all
the global configuration
of the project
'''

from sqlalchemy import create_engine 

USER = ""
PASSWORD = ""
SERVER = ""
PORT = ""

engine = create_engine(
    f"postgresql+psycopg2://{USER}:{PASSWORD}@{SERVER}:{PORT}/hola"
)