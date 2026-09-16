--
-- PostgreSQL database dump
--

\restrict P5rqJ83JY2ldmoh92WBQwfwNaFVG3Ot0YzwNKKWR2E6eEhecroc0oDE3r1SVYKm

-- Dumped from database version 17.11 (Homebrew)
-- Dumped by pg_dump version 17.11 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: diabetes_predictions; Type: TABLE; Schema: public; Owner: amitnishad12
--

CREATE TABLE public.diabetes_predictions (
    id integer NOT NULL,
    patient_id integer NOT NULL,
    pregnancies integer NOT NULL,
    glucose double precision NOT NULL,
    blood_pressure double precision NOT NULL,
    skin_thickness double precision NOT NULL,
    insulin double precision NOT NULL,
    bmi double precision NOT NULL,
    diabetes_pedigree_function double precision NOT NULL,
    age integer NOT NULL,
    prediction integer NOT NULL,
    probability double precision NOT NULL,
    created_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.diabetes_predictions OWNER TO amitnishad12;

--
-- Name: diabetes_predictions_id_seq; Type: SEQUENCE; Schema: public; Owner: amitnishad12
--

CREATE SEQUENCE public.diabetes_predictions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.diabetes_predictions_id_seq OWNER TO amitnishad12;

--
-- Name: diabetes_predictions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: amitnishad12
--

ALTER SEQUENCE public.diabetes_predictions_id_seq OWNED BY public.diabetes_predictions.id;


--
-- Name: medical_documents; Type: TABLE; Schema: public; Owner: amitnishad12
--

CREATE TABLE public.medical_documents (
    id integer NOT NULL,
    patient_id integer NOT NULL,
    file_name character varying(255) NOT NULL,
    file_path character varying(500) NOT NULL,
    file_type character varying(100),
    file_size integer,
    uploaded_at timestamp with time zone DEFAULT now(),
    extracted_text text
);


ALTER TABLE public.medical_documents OWNER TO amitnishad12;

--
-- Name: medical_documents_id_seq; Type: SEQUENCE; Schema: public; Owner: amitnishad12
--

CREATE SEQUENCE public.medical_documents_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.medical_documents_id_seq OWNER TO amitnishad12;

--
-- Name: medical_documents_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: amitnishad12
--

ALTER SEQUENCE public.medical_documents_id_seq OWNED BY public.medical_documents.id;


--
-- Name: medical_records; Type: TABLE; Schema: public; Owner: amitnishad12
--

CREATE TABLE public.medical_records (
    id integer NOT NULL,
    patient_id integer NOT NULL,
    record_type character varying(50) NOT NULL,
    diagnosis character varying(255),
    description text,
    record_date date,
    doctor_name character varying(100),
    created_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.medical_records OWNER TO amitnishad12;

--
-- Name: medical_records_id_seq; Type: SEQUENCE; Schema: public; Owner: amitnishad12
--

CREATE SEQUENCE public.medical_records_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.medical_records_id_seq OWNER TO amitnishad12;

--
-- Name: medical_records_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: amitnishad12
--

ALTER SEQUENCE public.medical_records_id_seq OWNED BY public.medical_records.id;


--
-- Name: patients; Type: TABLE; Schema: public; Owner: amitnishad12
--

CREATE TABLE public.patients (
    id integer NOT NULL,
    patient_code character varying(50) NOT NULL,
    name character varying(100) NOT NULL,
    age integer NOT NULL,
    gender character varying(20) NOT NULL,
    blood_group character varying(10),
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    ai_summary text
);


ALTER TABLE public.patients OWNER TO amitnishad12;

--
-- Name: patients_id_seq; Type: SEQUENCE; Schema: public; Owner: amitnishad12
--

CREATE SEQUENCE public.patients_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.patients_id_seq OWNER TO amitnishad12;

--
-- Name: patients_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: amitnishad12
--

ALTER SEQUENCE public.patients_id_seq OWNED BY public.patients.id;


--
-- Name: diabetes_predictions id; Type: DEFAULT; Schema: public; Owner: amitnishad12
--

ALTER TABLE ONLY public.diabetes_predictions ALTER COLUMN id SET DEFAULT nextval('public.diabetes_predictions_id_seq'::regclass);


--
-- Name: medical_documents id; Type: DEFAULT; Schema: public; Owner: amitnishad12
--

ALTER TABLE ONLY public.medical_documents ALTER COLUMN id SET DEFAULT nextval('public.medical_documents_id_seq'::regclass);


--
-- Name: medical_records id; Type: DEFAULT; Schema: public; Owner: amitnishad12
--

ALTER TABLE ONLY public.medical_records ALTER COLUMN id SET DEFAULT nextval('public.medical_records_id_seq'::regclass);


--
-- Name: patients id; Type: DEFAULT; Schema: public; Owner: amitnishad12
--

ALTER TABLE ONLY public.patients ALTER COLUMN id SET DEFAULT nextval('public.patients_id_seq'::regclass);


--
-- Data for Name: diabetes_predictions; Type: TABLE DATA; Schema: public; Owner: amitnishad12
--

COPY public.diabetes_predictions (id, patient_id, pregnancies, glucose, blood_pressure, skin_thickness, insulin, bmi, diabetes_pedigree_function, age, prediction, probability, created_at) FROM stdin;
1	1	2	120	70	20	80	30.5	0.5	35	0	0.12314878814117093	2026-09-17 03:58:27.114931+05:30
\.


--
-- Data for Name: medical_documents; Type: TABLE DATA; Schema: public; Owner: amitnishad12
--

COPY public.medical_documents (id, patient_id, file_name, file_path, file_type, file_size, uploaded_at, extracted_text) FROM stdin;
1	1	fake_medical_report.pdf	uploads/patient_1/fake_medical_report.pdf	application/pdf	3465	2026-09-17 02:26:42.121027+05:30	\N
2	1	fake_medical_report.pdf	/Users/amitnishad12/Desktop/Medisense/backend/uploads/patient_1/fake_medical_report.pdf	application/pdf	3465	2026-09-17 02:30:05.453621+05:30	\N
3	1	fake_medical_report.pdf	/Users/amitnishad12/Desktop/Medisense/backend/uploads/patient_1/fake_medical_report.pdf	application/pdf	3465	2026-09-17 02:30:51.917358+05:30	\N
4	1	fake_medical_report.pdf	/Users/amitnishad12/Desktop/Medisense/backend/uploads/patient_1/fake_medical_report.pdf	application/pdf	3465	2026-09-17 02:31:10.984947+05:30	\N
5	1	fake_medical_report_text_sample.pdf	/Users/amitnishad12/Desktop/Medisense/backend/uploads/patient_1/fake_medical_report_text_sample.pdf	application/pdf	4309	2026-09-17 02:53:26.801515+05:30	CITY CARE MULTISPECIALITY CLINIC\nFICTIONAL SAMPLE MEDICAL REPORT — NOT A REAL MEDICAL RECORD\nPatient Name\nPriya Verma\nReport No.\nCCR-2026-01984\nAge / Sex\n34 / Female\nDate\n17 September 2026\nDepartment\nGeneral Medicine\nPhysician\nDr. R. Kapoor\nChief Complaint\nThe patient reports intermittent fatigue, mild headache, and reduced appetite for approximately five days. She\ndenies chest pain, shortness of breath, or persistent fever. No acute distress was reported during the\nconsultation.\nHistory of Present Illness\nAccording to the fictional history provided for this demonstration, symptoms began gradually after several days\nof reduced sleep and increased academic workload. The patient reports drinking less water than usual and\noccasionally skipping meals. No recent hospitalization or surgery is documented in this sample record.\nPhysical Examination\nParameter\nObservation\nGeneral Appearance\nAlert and oriented; no acute distress\nBlood Pressure\n118/76 mmHg\nPulse\n78 beats/min\nTemperature\n98.4 °F\nRespiratory Rate\n16 breaths/min\nInvestigations\nA fictional CBC and basic metabolic panel were reviewed. The sample values are within the reference intervals\ndisplayed in the accompanying laboratory report. No significant abnormality is described in this fictional case.\nAssessment\nThe fictional presentation is described as nonspecific fatigue with mild headache. Possible contributing factors in\nthis demonstration include inadequate sleep, irregular meals, and insufficient fluid intake. This statement is part\nof a fabricated dataset and is not a medical diagnosis.\nPlan / Recommendations\nFor this fictional example, the clinician recommends adequate hydration, regular balanced meals, sufficient\nsleep, and observation of symptoms. Follow-up with a qualified healthcare professional is suggested if\nsymptoms persist or worsen.\nAdditional Notes\nThis document was generated specifically for testing medical-document processing software. It contains\ninvented names, dates, observations, clinical history, and recommendations. It should not be presented as\nevidence of an actual medical visit or used to make healthcare decisions.\n\nSAMPLE DOCUMENT • FICTIONAL DATA • FOR MEDISENSE OCR / NLP / AI TESTING ONLY
\.


--
-- Data for Name: medical_records; Type: TABLE DATA; Schema: public; Owner: amitnishad12
--

COPY public.medical_records (id, patient_id, record_type, diagnosis, description, record_date, doctor_name, created_at) FROM stdin;
1	1	Diagnosis	Hypertension	Patient has elevated blood pressure.	2026-09-15	Dr. Sharma	2026-09-17 02:08:54.745891+05:30
\.


--
-- Data for Name: patients; Type: TABLE DATA; Schema: public; Owner: amitnishad12
--

COPY public.patients (id, patient_code, name, age, gender, blood_group, created_at, updated_at, ai_summary) FROM stdin;
1	P-D720132C	Rahul Sharma	45	Male	B+	2026-09-17 01:47:11.629915+05:30	2026-09-17 03:21:10.986822+05:30	## 1. Patient Information\n- Provided patient information: Rahul Sharma, 45-year-old male.\n- The document itself lists Priya Verma, 34-year-old female.\n- The report is explicitly labeled fictional and not a real medical record.\n\n## 2. Key Medical Findings\n- Intermittent fatigue, mild headache, and reduced appetite for approximately five days.\n- No chest pain, shortness of breath, or persistent fever reported.\n- No acute distress; alert and oriented.\n- Vital signs documented as:\n  - Blood pressure: 118/76 mmHg\n  - Pulse: 78 beats/min\n  - Temperature: 98.4 °F\n  - Respiratory rate: 16 breaths/min\n\n## 3. Diagnoses / Conditions\n- Assessment described nonspecific fatigue with mild headache.\n- The report states this is not a medical diagnosis.\n- Possible contributing factors mentioned include reduced sleep, irregular meals, and insufficient fluid intake.\n\n## 4. Medications\n- No medications documented.\n\n## 5. Tests / Investigations\n- A fictional CBC and basic metabolic panel were reviewed.\n- Values were described as within the displayed reference intervals.\n- No significant abnormality was described.\n\n## 6. Important Medical History\n- Symptoms reportedly began after several days of reduced sleep and increased academic workload.\n- Reported decreased water intake and occasional skipped meals.\n- No recent hospitalization or surgery documented.\n\n## 7. Overall Summary\n- This is a fictional sample report describing short-duration fatigue, mild headache, and reduced appetite in a patient identified in the document as Priya Verma.\n- Examination and fictional laboratory findings were unremarkable.\n- The document should not be used as evidence of an actual medical visit or for healthcare decision-making.
3	P-7CA95C14	xyz	45	Male	B+	2026-09-17 04:45:10.791052+05:30	2026-09-17 04:45:10.791052+05:30	\N
\.


--
-- Name: diabetes_predictions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: amitnishad12
--

SELECT pg_catalog.setval('public.diabetes_predictions_id_seq', 1, true);


--
-- Name: medical_documents_id_seq; Type: SEQUENCE SET; Schema: public; Owner: amitnishad12
--

SELECT pg_catalog.setval('public.medical_documents_id_seq', 5, true);


--
-- Name: medical_records_id_seq; Type: SEQUENCE SET; Schema: public; Owner: amitnishad12
--

SELECT pg_catalog.setval('public.medical_records_id_seq', 1, true);


--
-- Name: patients_id_seq; Type: SEQUENCE SET; Schema: public; Owner: amitnishad12
--

SELECT pg_catalog.setval('public.patients_id_seq', 3, true);


--
-- Name: diabetes_predictions diabetes_predictions_pkey; Type: CONSTRAINT; Schema: public; Owner: amitnishad12
--

ALTER TABLE ONLY public.diabetes_predictions
    ADD CONSTRAINT diabetes_predictions_pkey PRIMARY KEY (id);


--
-- Name: medical_documents medical_documents_pkey; Type: CONSTRAINT; Schema: public; Owner: amitnishad12
--

ALTER TABLE ONLY public.medical_documents
    ADD CONSTRAINT medical_documents_pkey PRIMARY KEY (id);


--
-- Name: medical_records medical_records_pkey; Type: CONSTRAINT; Schema: public; Owner: amitnishad12
--

ALTER TABLE ONLY public.medical_records
    ADD CONSTRAINT medical_records_pkey PRIMARY KEY (id);


--
-- Name: patients patients_pkey; Type: CONSTRAINT; Schema: public; Owner: amitnishad12
--

ALTER TABLE ONLY public.patients
    ADD CONSTRAINT patients_pkey PRIMARY KEY (id);


--
-- Name: ix_diabetes_predictions_id; Type: INDEX; Schema: public; Owner: amitnishad12
--

CREATE INDEX ix_diabetes_predictions_id ON public.diabetes_predictions USING btree (id);


--
-- Name: ix_diabetes_predictions_patient_id; Type: INDEX; Schema: public; Owner: amitnishad12
--

CREATE INDEX ix_diabetes_predictions_patient_id ON public.diabetes_predictions USING btree (patient_id);


--
-- Name: ix_medical_documents_id; Type: INDEX; Schema: public; Owner: amitnishad12
--

CREATE INDEX ix_medical_documents_id ON public.medical_documents USING btree (id);


--
-- Name: ix_medical_documents_patient_id; Type: INDEX; Schema: public; Owner: amitnishad12
--

CREATE INDEX ix_medical_documents_patient_id ON public.medical_documents USING btree (patient_id);


--
-- Name: ix_medical_records_id; Type: INDEX; Schema: public; Owner: amitnishad12
--

CREATE INDEX ix_medical_records_id ON public.medical_records USING btree (id);


--
-- Name: ix_medical_records_patient_id; Type: INDEX; Schema: public; Owner: amitnishad12
--

CREATE INDEX ix_medical_records_patient_id ON public.medical_records USING btree (patient_id);


--
-- Name: ix_patients_id; Type: INDEX; Schema: public; Owner: amitnishad12
--

CREATE INDEX ix_patients_id ON public.patients USING btree (id);


--
-- Name: ix_patients_patient_code; Type: INDEX; Schema: public; Owner: amitnishad12
--

CREATE UNIQUE INDEX ix_patients_patient_code ON public.patients USING btree (patient_code);


--
-- Name: diabetes_predictions diabetes_predictions_patient_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: amitnishad12
--

ALTER TABLE ONLY public.diabetes_predictions
    ADD CONSTRAINT diabetes_predictions_patient_id_fkey FOREIGN KEY (patient_id) REFERENCES public.patients(id) ON DELETE CASCADE;


--
-- Name: medical_documents medical_documents_patient_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: amitnishad12
--

ALTER TABLE ONLY public.medical_documents
    ADD CONSTRAINT medical_documents_patient_id_fkey FOREIGN KEY (patient_id) REFERENCES public.patients(id) ON DELETE CASCADE;


--
-- Name: medical_records medical_records_patient_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: amitnishad12
--

ALTER TABLE ONLY public.medical_records
    ADD CONSTRAINT medical_records_patient_id_fkey FOREIGN KEY (patient_id) REFERENCES public.patients(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict P5rqJ83JY2ldmoh92WBQwfwNaFVG3Ot0YzwNKKWR2E6eEhecroc0oDE3r1SVYKm

