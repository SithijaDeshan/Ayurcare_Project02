import React, { useState } from 'react';
import getSpecialtyRecommendation from "./api/ModelApiService"

const PredictionComponent = () => {
    const [symptoms, setSymptoms] = useState('');
    const [specialty, setSpecialty] = useState('');
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        setSymptoms(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await getSpecialtyRecommendation(symptoms);
            setSpecialty(result.specialty);
            setError('');
        } catch (err) {
            setError('Failed to fetch the specialty recommendation.');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={symptoms}
                    onChange={handleInputChange}
                    placeholder="Enter symptoms"
                />
                <button type="submit">Get Recommendation</button>
            </form>
            {specialty && <div>Recommended Specialty: {specialty}</div>}
            {error && <div>{error}</div>}
        </div>
    );
};

export default PredictionComponent;
