from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from . import models
from .database import Base, engine
from .routes import (
    ai_summary,
    medical_documents,
    medical_records,
    patients,
    prediction,
)


# Create database tables
Base.metadata.create_all(bind=engine)


app = FastAPI(
    title="Medisense API",
    description="Medical Record Management and AI-assisted Analysis API",
    version="1.0.0"
)


# =========================
# CORS
# =========================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[],
    allow_origin_regex=r"https?://(localhost|127\.0\.0\.1)(:\d+)?",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =========================
# Routes
# =========================

app.include_router(
    patients.router
)

app.include_router(
    medical_records.router
)

app.include_router(
    medical_documents.router
)

app.include_router(
    ai_summary.router
)

app.include_router(
    prediction.router
)


# =========================
# Root endpoint
# =========================

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