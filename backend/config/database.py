'''
In this file, should be all
the global configuration
of the project
'''

from sqlalchemy import create_engine 

USER = "postgres"
PASSWORD = "holapostgres"
SERVER = "postgres-1.csa5zq8qsnjp.us-east-1.rds.amazonaws.com"
PORT = "5432"

engine = create_engine(
    f"postgresql+psycopg2://{USER}:{PASSWORD}@{SERVER}:{PORT}/hola"
)
