from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from passlib.context import CryptContext

from app.database import SessionLocal
from app.models.user import User

router = APIRouter()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/signup")
def signup(user: dict, db: Session = Depends(get_db)):

    existing_user = db.query(User).filter(User.email == user["email"]).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already exists")

    # truncate password to avoid bcrypt 72-byte error
    password = user["password"][:72]

    hashed_password = pwd_context.hash(password)

    new_user = User(
        email=user["email"],
        password=hashed_password
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"message": "Signup successful"}


@router.post("/login")
def login(user: dict, db: Session = Depends(get_db)):

    db_user = db.query(User).filter(User.email == user["email"]).first()

    if not db_user:
        raise HTTPException(status_code=400, detail="User not found")

    if not pwd_context.verify(user["password"], db_user.password):
        raise HTTPException(status_code=400, detail="Incorrect password")

    return {"message": "Login successful"}


@router.get("/test-users")
def test_users(db: Session = Depends(get_db)):
    users = db.query(User).all()
    return users
