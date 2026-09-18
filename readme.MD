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


Project Structure
Medisense/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   │   └── api.js
│   │   └── ...
│   │
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── package.json
│   └── ...
│
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── database.py
│   │   ├── models.py
│   │   ├── schemas.py
│   │   │
│   │   ├── routes/
│   │   │   ├── patients.py
│   │   │   ├── medical_records.py
│   │   │   ├── medical_documents.py
│   │   │   ├── ai_summary.py
│   │   │   └── prediction.py
│   │   │
│   │   └── services/
│   │       ├── pdf_extractor.py
│   │       ├── ai_summary.py
│   │       └── ml_prediction.py
│   │
│   ├── Dockerfile
│   ├── requirements.txt
│   └── ...
│
├── ml/
│   ├── data/
│   │   └── diabetes.csv
│   │
│   ├── model/
│   │   ├── diabetes_model.joblib
│   │   └── diabetes_scaler.joblib
│   │
│   ├── inspect_data.py
│   └── train.py
│
├── uploads/
│
├── docker-compose.yml
├── .gitignore
└── README.md
Database Design

Medisense uses PostgreSQL with four main tables.

Patients
patients
├── id
├── patient_code
├── name
├── age
├── gender
├── blood_group
├── ai_summary
├── created_at
└── updated_at
Medical Records
medical_records
├── id
├── patient_id
├── record_type
├── diagnosis
├── description
├── record_date
├── doctor_name
└── created_at
Medical Documents
medical_documents
├── id
├── patient_id
├── file_name
├── file_path
├── file_type
├── file_size
├── extracted_text
└── uploaded_at
Diabetes Predictions
diabetes_predictions
├── id
├── patient_id
├── pregnancies
├── glucose
├── blood_pressure
├── skin_thickness
├── insulin
├── bmi
├── diabetes_pedigree_function
├── age
├── prediction
├── probability
└── created_at
Machine Learning

The diabetes prediction module uses the Pima Indians Diabetes Dataset.

Dataset
Rows: 768
Features: 8
Target: Outcome
Features
Pregnancies
Glucose
BloodPressure
SkinThickness
Insulin
BMI
DiabetesPedigreeFunction
Age
Target
0 → Lower predicted risk
1 → Higher predicted risk
ML Pipeline
Dataset
   │
   ▼
Train/Test Split
   │
   ▼
StandardScaler
   │
   ▼
Logistic Regression
   │
   ▼
Prediction
   │
   ▼
Probability
   │
   ▼
PostgreSQL
Training Configuration
Training samples: 614
Testing samples: 154
Random state: 42
Model Evaluation

Current test-set performance:

Accuracy: 0.7078
ROC-AUC:  0.8263

Confusion matrix:

[[79, 21],
 [24, 30]]

The model is intended for educational demonstration and is not clinically validated.

AI Summary Pipeline

The AI summary system follows this flow:

Patient
   │
   ├── Medical Records
   │
   ├── Medical Documents
   │
   └── Extracted PDF Text
           │
           ▼
      FastAPI Backend
           │
           ▼
       OpenAI API
           │
           ▼
      Generated Summary
           │
           ▼
       PostgreSQL

The AI system summarizes information already stored in Medisense.

It is not designed to:

Diagnose diseases
Prescribe medication
Recommend treatment
Replace healthcare professionals
REST API
Patient Endpoints
GET    /patients/
POST   /patients/
GET    /patients/{patient_id}
DELETE /patients/{patient_id}
Medical Record Endpoints
GET    /patients/{patient_id}/medical-records/
POST   /patients/{patient_id}/medical-records/
DELETE /patients/{patient_id}/medical-records/{record_id}
Medical Document Endpoints
GET  /patients/{patient_id}/medical-documents/
POST /patients/{patient_id}/medical-documents/

GET /patients/{patient_id}/medical-documents/{document_id}/view

GET /patients/{patient_id}/medical-documents/{document_id}/download
AI Summary Endpoints
GET  /patients/{patient_id}/ai-summary
POST /patients/{patient_id}/ai-summary
Machine Learning Endpoints
POST /predictions/diabetes
GET  /predictions/patient/{patient_id}
Health Check
GET /health
Running the Project Locally
Prerequisites

Install the following:

Node.js
Python
PostgreSQL
Docker Desktop
Git
Run Using Docker Compose

From the project root:

cd Medisense

Build and start all services:

docker compose up --build

The application will run at:

Frontend:
http://localhost:3000

Backend:
http://localhost:8000

FastAPI Swagger:
http://localhost:8000/docs

PostgreSQL:
localhost:5432

Stop the application:

docker compose down

Rebuild after code changes:

docker compose up --build
Run Backend Separately

Navigate to the backend:

cd Medisense/backend

Create a virtual environment:

python3 -m venv venv

Activate it on macOS/Linux:

source venv/bin/activate

Install dependencies:

pip install -r requirements.txt

Create a .env file:

DATABASE_URL=postgresql://<username>:<password>@localhost:5432/medisense
OPENAI_API_KEY=<your_openai_api_key>

Start FastAPI:

uvicorn app.main:app --reload

Backend:

http://localhost:8000

Swagger API documentation:

http://localhost:8000/docs
Run Frontend Separately

Navigate to the frontend:

cd Medisense/frontend

Install dependencies:

npm install

Start the development server:

npm run dev

Frontend:

http://localhost:5173
Environment Variables

Sensitive credentials must never be committed to GitHub.

Example:

DATABASE_URL=postgresql://<username>:<password>@<host>:5432/medisense
OPENAI_API_KEY=<your_openai_api_key>

The following files should remain ignored by Git:

.env
backend/.env
Docker Architecture

Medisense uses Docker Compose for local container orchestration.

                 Docker Compose
                       │
        ┌──────────────┼──────────────┐
        │              │              │
        ▼              ▼              ▼
    Frontend        Backend       PostgreSQL
     Nginx          FastAPI
        │              │
        │              ├── ML Model
        │              ├── OpenAI API
        │              └── PDF Extraction
        │
        └──────── HTTP ───────────────┘

The frontend is built using Node.js and served using Nginx.

Nginx is configured to support React SPA routing.

AWS Deployment

Medisense is being deployed to AWS.

Amazon RDS

PostgreSQL has been migrated to Amazon RDS.

Service: Amazon RDS
Engine: PostgreSQL
Region: ap-south-1 (Mumbai)

RDS stores:

Patient information
Medical records
Medical document metadata
AI summaries
ML predictions
Amazon S3

An Amazon S3 bucket has been created for medical document storage.

The planned document architecture is:

React
  │
  ▼
FastAPI
  │
  ▼
Amazon S3
  │
  └── Medical Documents

The backend is being migrated from local document storage to S3.

AWS Deployment Roadmap
AWS Account
     │
     ▼
Amazon RDS PostgreSQL       ✓
     │
     ▼
Amazon S3                   ✓
     │
     ▼
Amazon ECR
     │
     ▼
Amazon ECS
     │
     ▼
Application Load Balancer
     │
     ▼
Frontend Deployment
     │
     ▼
GitHub Actions CI/CD
AWS Services
Service	Purpose
Amazon RDS	PostgreSQL database
Amazon S3	Medical document storage
Amazon ECR	Docker image registry
Amazon ECS	Container deployment
Application Load Balancer	Traffic routing
GitHub Actions	CI/CD automation
Security Considerations

Medisense is an educational and portfolio project.

Security practices include:

Never commit .env files
Never expose API keys
Keep S3 buckets private
Restrict database security-group access
Use HTTPS in production
Store secrets using environment variables
Use IAM roles for AWS services
Follow least-privilege access
Keep the production database private whenever possible
Future Improvements
Complete Amazon S3 integration
Deploy Docker images using Amazon ECR
Deploy backend using Amazon ECS
Configure Application Load Balancer
Deploy frontend to AWS
Implement GitHub Actions CI/CD
Add HTTPS and custom domain
Add automated testing
Add database migrations using Alembic
Improve ML model evaluation
Add additional ML models
Improve document processing
Add authentication and authorization for production use
Add role-based access control
Improve application monitoring and logging
Project Status
Component	Status
React Frontend	Completed
FastAPI Backend	Completed
PostgreSQL	Completed
Patient Management	Completed
Medical Records	Completed
Patient Dashboard	Completed
PDF Upload	Completed
PDF Text Extraction	Completed
AI Medical Summary	Completed
ML Prediction	Completed
Prediction History	Completed
Dockerization	Completed
Docker Compose	Completed
Nginx SPA Routing	Completed
AWS RDS	Completed
AWS S3 Bucket	Completed
S3 Backend Integration	In Progress
AWS ECR	Planned
AWS ECS	Planned
Application Load Balancer	Planned
Frontend Cloud Deployment	Planned
GitHub Actions CI/CD	Planned
Learning Outcomes

Through this project, I worked with:

Full-Stack Development
React.js
JavaScript
Tailwind CSS
REST APIs
Axios
FastAPI
SQLAlchemy
PostgreSQL
Machine Learning
Data preprocessing
Train/test splitting
Feature scaling
Logistic Regression
Model evaluation
Model serialization
ML model integration with FastAPI
Generative AI
OpenAI API integration
AI-powered summarization
Combining structured and unstructured data
Processing extracted PDF text
DevOps
Docker
Docker Compose
Nginx
Containerized application architecture
Cloud
Amazon RDS
Amazon S3
Amazon ECR
Amazon ECS
Application Load Balancer
GitHub Actions CI/CD
Author
Amit Nishad

B.Tech Biotechnology
Indian Institute of Technology Hyderabad

Interests
Software Development
Full-Stack Development
Machine Learning
Artificial Intelligence
Cloud Computing
DevOps
Disclaimer

Medisense is an educational and portfolio project.

The Machine Learning predictions and AI-generated summaries are demonstrations of software and AI/ML integration. They are not medical diagnoses, treatment recommendations, or substitutes for professional medical advice.

Sponsored options
Ad