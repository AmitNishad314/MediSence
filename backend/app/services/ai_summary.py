import os

from openai import OpenAI


client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


def generate_medical_summary(
    patient_name: str,
    age: int,
    gender: str,
    medical_text: str
) -> str:
    if not medical_text.strip():
        return "No medical text was available for summarization."

    prompt = f"""
You are a medical-document summarization assistant.

Patient information:
Name: {patient_name}
Age: {age}
Gender: {gender}

Medical document text:
----------------------
{medical_text}
----------------------

Create a concise, structured summary using these sections:

1. Patient Information
2. Key Medical Findings
3. Diagnoses / Conditions
4. Medications
5. Tests / Investigations
6. Important Medical History
7. Overall Summary

Only use information explicitly present in the provided text. Do not invent
missing information, diagnose new conditions, or recommend treatment.
"""

    response = client.responses.create(
        model="gpt-5.6-luna",
        input=prompt
    )

    return response.output_text.strip()
