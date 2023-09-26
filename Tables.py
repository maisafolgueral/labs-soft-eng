from typing import List
from typing import Optional
from sqlalchemy import ForeignKey
from sqlalchemy import String
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import relationship

class Base(DeclarativeBase):
    pass

class User(Base):
    __tablename__ = "user"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(30))
    surname: Mapped[str] = mapped_column(String(30))
    gender: Mapped[str] = mapped_column(String(30))
    email: Mapped[str] = mapped_collumn(String(30))
    
    def __repr__(self) -> str:
        return f"User(id={self.id!r}, name={self.name!r}, surname={self.surname!r}, gender={self.gender!r}, email={self.email!r})"

