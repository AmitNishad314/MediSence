import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8000",
    headers: {
        "Content-Type": "application/json",
    },
});

// ==================== PATIENTS ====================

export const getPatients = async () => {
    const response = await api.get("/patients/");
    return response.data;
};

export const getPatient = async (patientId) => {
    const response = await api.get(`/patients/${patientId}`);
    return response.data;
};

export const createPatient = async (patientData) => {
    const response = await api.post("/patients/", patientData);
    return response.data;
};

export const deletePatient = async (patientId) => {
    await api.delete(`/patients/${patientId}`);
};

// ==================== MEDICAL RECORDS ====================

export const getMedicalRecords = async (patientId) => {
    const response = await api.get(
        `/patients/${patientId}/medical-records/`
    );

    return response.data;
};

export const createMedicalRecord = async (
    patientId,
    recordData
) => {
    const response = await api.post(
        `/patients/${patientId}/medical-records/`,
        recordData
    );

    return response.data;
};

export const deleteMedicalRecord = async (
    patientId,
    recordId
) => {
    await api.delete(
        `/patients/${patientId}/medical-records/${recordId}`
    );
};

// ==================== MEDICAL DOCUMENTS ====================

export const getMedicalDocuments = async (patientId) => {
    const response = await api.get(
        `/patients/${patientId}/medical-documents/`
    );

    return response.data;
};

export const uploadMedicalDocument = async (
    patientId,
    file
) => {
    const formData = new FormData();

    formData.append("file", file);

    const response = await api.post(
        `/patients/${patientId}/medical-documents/`,
        formData
    );

    return response.data.document;
};

export default api;