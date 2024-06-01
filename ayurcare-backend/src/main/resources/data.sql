-- Insert into Medicaluser table
INSERT INTO medicaluser (medicaluser_id, medicaluser_firstname, medicaluser_lastname, medicaluser_email, medicaluser_phoneno, medicaluser_photo, medicaluser_address, medicaluser_role, medicaluser_Intreatment)
VALUES
('ACU001', 'John', 'Doe', 'john.doe@example.com', '1234567890', NULL, '1234 Elm Street', 'Doctor', 'No'),
('ACU002', 'Jane', 'Smith', 'jane.smith@example.com', '0987654321', NULL, '5678 Maple Avenue', 'Patient', 'Yes');

-- Insert into Category table
INSERT INTO category (category_id, predefined_time, categories)
VALUES
('ACC001', '2023-06-01', 'General Medicine'),
('ACC002', '2023-06-02', 'Ayurveda Therapy');

-- Insert into Patient table
INSERT INTO patient (patient_id, medicaluser_id, category_id, treatment_startdate, duration)
VALUES
('ACPT001', 'ACU002', 'ACC001', '2024-01-01', '30 days'),
('ACPT002', 'ACU002', 'ACC002', '2024-02-01', '15 days');

-- Insert into MedicalRecord table
INSERT INTO medicalrecord (medical_id, patient_id, prescription_issuedate, medical_record)
VALUES
('ACMR001', 'ACPT001', '2024-01-02', 'dummy_data_1'),
('ACMR002', 'ACPT002', '2024-02-02', 'dummy_data_2');

-- Insert into Payment table
INSERT INTO payment (payment_id, invoice_id, payment_date, payment_amount, medicaluser_id)
VALUES
('ACP001', '#ACI001', '2024-01-15', '1000', 'ACU002'),
('ACP002', '#ACI002', '2024-02-15', '500', 'ACU002');
