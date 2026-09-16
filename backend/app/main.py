from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from . import models
from .database import Base, engine
from .routes import medical_records, patients


# Create database tables
Base.metadata.create_all(bind=engine)


app = FastAPI(
    title="Medisense API",
    description="Medical Record Management and AI-assisted Analysis API",
    version="1.0.0"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# API routes
app.include_router(patients.router)
app.include_router(medical_records.router)


@app.get("/")
def root():
    return {
        "message": "Medisense API is running",
        "status": "success"
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }