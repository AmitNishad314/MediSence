# Medisense

Medisense is a full-stack medical record management system built using **React.js, FastAPI, PostgreSQL, Machine Learning, Generative AI, Docker, and AWS**.

The application allows users to manage patient information, maintain medical records, upload medical documents, generate AI-based medical summaries, and generate diabetes-risk predictions using a Machine Learning model.

> **Note:** Medisense is an educational and portfolio project. It is not intended for medical diagnosis, treatment recommendations, or clinical decision-making.

---

## Features

### Patient Management

- Create patients
- View patient information
- Delete patients
- Automatically generated patient codes
- Store basic patient information

### Medical Records

- Add medical records for patients
- Store:
  - Record type
  - Diagnosis
  - Description
  - Record date
  - Doctor name
- View patient medical history
- Delete medical records

### Medical Documents

- Upload medical documents
- Associate documents with patients
- View uploaded documents
- Download documents
- Extract text from PDF files

### AI Medical Summary

- Generate AI-based summaries of patient information
- Use medical records and extracted document text
- Store generated summaries in PostgreSQL
- Uses the OpenAI API
- Designed to summarize documented information rather than diagnose medical conditions

### Machine Learning Prediction

- Diabetes-risk prediction using Logistic Regression
- Uses patient health-related input features
- Uses StandardScaler for feature scaling
- Stores predictions and probabilities in PostgreSQL
- Maintains prediction history for each patient

---

# Technology Stack

## Frontend

- React.js
- JavaScript
- Tailwind CSS
- Axios
- Vite

## Backend

- Python
- FastAPI
- SQLAlchemy
- Pydantic
- PyMuPDF
- OpenAI API
- Pandas
- Joblib
- Scikit-learn

## Database

- PostgreSQL

## Machine Learning

- Scikit-learn
- Logistic Regression
- StandardScaler
- Pandas
- Joblib

## DevOps

- Docker
- Docker Compose
- Nginx

## AWS

- Amazon RDS PostgreSQL
- Amazon S3
- Amazon ECR
- Amazon ECS
- Application Load Balancer
- GitHub Actions

---

# System Architecture

```text
                    ┌──────────────────────┐
                    │      React.js        │
                    │ JavaScript +         │
                    │ Tailwind CSS         │
                    └──────────┬───────────┘
                               │
                               │ REST API
                               ▼
                    ┌──────────────────────┐
                    │       FastAPI        │
                    │      Backend         │
                    └───────┬───────┬──────┘
                            │       │
                 ┌──────────┘       └──────────────┐
                 ▼                                 ▼
        ┌──────────────────┐              ┌──────────────────┐
        │   PostgreSQL     │              │ Machine Learning │
        │                  │              │      Model       │
        │ Patients         │              │                  │
        │ Medical Records  │              │ Logistic         │
        │ AI Summaries     │              │ Regression       │
        │ Predictions      │              │ + StandardScaler │
        └──────────────────┘              └──────────────────┘
                 │
                 │
                 ▼
        ┌──────────────────┐
        │ Medical Documents│
        │      (PDF)       │
        └────────┬─────────┘
                 │
                 ▼
        ┌──────────────────┐
        │     PyMuPDF      │
        │  Text Extraction  │
        └────────┬─────────┘
                 │
                 ▼
        ┌──────────────────┐
        │    OpenAI API    │
        │   AI Summary     │
        └──────────────────┘