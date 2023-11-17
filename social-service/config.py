'''
In this file, should be all
the global configuration
of the project
'''

from sqlalchemy import create_engine

# Database
USER = "adminhola"
PASSWORD = "Hola23*"
HOST = "db" # container service name
PORT = "5432"
DATABASE = "hola"

engine = create_engine(
    f"postgresql+psycopg2://{USER}:{PASSWORD}@{HOST}:{PORT}/{DATABASE}"
)

# Secret Key for authentication
SECRET_KEY = '1j(((7th^av$kz^!x47mdtkreya%*ounq(&s%fxkxp$=07*v#2'