'''
In this file, should be all
the global configuration
of the project
'''

from sqlalchemy import create_engine 

# Database
USER = "postgres"
PASSWORD = "Nohack?99"
SERVER = "localhost"
PORT = "5432"
DATABASE = "hola"

engine = create_engine(
    f"postgresql+psycopg2://{USER}:{PASSWORD}@{SERVER}:{PORT}/{DATABASE}"
)