-- Insert into Medicaluser table
INSERT INTO medicaluser (medicaluser_id, medicaluser_firstname, medicaluser_lastname, medicaluser_email, medicaluser_phoneno, medicaluser_photo, medicaluser_address, medicaluser_role, medicaluser_Intreatment)
VALUES
('ACU00001', 'John', 'Doe', 'john.doe@example.com', '1234567890', NULL, '1234 Elm Street', 'Doctor', 'No'),
('ACU00002', 'Jane', 'Smith', 'jane.smith@example.com', '0987654321', NULL, '5678 Maple Avenue', 'Patient', 'Yes');

-- Insert into Category table
INSERT INTO category (category_id, predefined_time, categories)
VALUES
('ACC00001', '08:00-10:30', 'Meda'),
('ACC00002', '10:40-12:00', 'Vata'),
('ACC00003', '13:00-13:30', 'Kapha'),
('ACC00004', '13:30-14:00', 'Pitta'),
('ACC00005', '14:00-14:30', 'Rasa'),
('ACC00006', '14:30-15:00', 'Mamsa'),
('ACC00007', '15:00-15:30', 'Rakta'),
('ACC00008', '15:30-16:00', 'Unknown');

-- Insert into Patient table
INSERT INTO patient (patient_id, medicaluser_id, category_id, treatment_startdate, duration)
VALUES
('ACPT00001', 'ACU00001', 'ACC00001', '2024-01-01', '30 days'),
('ACPT00002', 'ACU00002', 'ACC00002', '2024-02-01', '15 days');

-- Insert into MedicalRecord table
--INSERT INTO medicalrecord (medical_id, patient_id, prescription_issuedate, medical_record)
--VALUES
--('ACMR00001', 'ACPT00001', '2024-01-02', 'Picture 1'),
--('ACMR00002', 'ACPT00003', '2024-02-02', 'Picture 2');

-- Insert into Payment table
INSERT INTO payment (payment_id, invoice_id, payment_date, payment_amount, medicaluser_id)
VALUES
('ACP00001', '#ACI00001', '2024-01-15', '1000', 'ACU00002'),
('ACP00002', '#ACI00002', '2024-02-15', '500', 'ACU00002');
