'''
In this file, should be all
the global configuration
of the project
'''

from sqlalchemy import create_engine
import random
import string

# Database
USER = "postgres"
PASSWORD = "holapostgres"
SERVER = "postgres-1.csa5zq8qsnjp.us-east-1.rds.amazonaws.com"
PORT = "5432"
DATABASE = "postgres"

engine = create_engine(
    f"postgresql+psycopg2://{USER}:{PASSWORD}@{SERVER}:{PORT}/{DATABASE}"
)

# Secret Key for authentication
random_str = string.ascii_letters + string.digits + string.ascii_uppercase
key = ''.join(random.choice(random_str) for _ in range(16))
SECRET_KEY = key