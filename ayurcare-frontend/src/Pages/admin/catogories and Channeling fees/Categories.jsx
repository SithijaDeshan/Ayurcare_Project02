import React, { useEffect, useState } from 'react';
import './categories.css';
import { toast, ToastContainer } from 'react-toastify';
import { getAllCategories, updateCategoriesPredifinedtime, getChannelingFee, updateChannelingFee } from "../../../Components/api/AyurcareApiService";
import ConfirmationModal from './ConfirmationModal';
import '../../../Styles/customToast.css'


function Categories() {
    const token = localStorage.getItem('token');
    const [categories, setCategories] = useState([]);
    const [doctorFee, setDoctorFee] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [confirmAction, setConfirmAction] = useState(null);

    useEffect(() => {
        RetriveAllCategories();
    }, []);

    const RetriveAllCategories = async () => {
        try {
            const response = await getAllCategories(token);
            const categoryData = response.data.map(item => ({
                categoryId: item.categoryId,
                predefinedTime: item.predefinedTime,
                categoryName: item.categories
            }));
            setCategories(categoryData);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        RetrieveFee();
    }, []);

    const RetrieveFee = async () => {
        try {
            const response = await getChannelingFee(token);
            const fee = response.data.fee;  // Extract the fee value
            setDoctorFee(fee);              // Set it in the state
        } catch (e) {
            console.log(e);
        }
    };

    const handleCategoryChange = (index, value) => {
        setCategories((prevCategories) => {
            const updatedCategories = [...prevCategories];
            updatedCategories[index].predefinedTime = value;
            return updatedCategories;
        });
    };

    const handleDoctorFeeChange = (e) => {
        setDoctorFee(e.target.value);
    };

    const handleSuccessToast = (message) => {
        toast.success(message, {
            position: toast.POSITION.TOP_CENTER,
            className: "custom-toast-success",
            autoClose: 5000 // Set the duration for the toast, e.g., 5000 ms (5 seconds)
        });
    };

    const handleSubmitCategories = async () => {
        try {
            await Promise.all(
                categories.map(async (category) => {
                    const { categoryId, predefinedTime } = category;
                    if (predefinedTime) {
                        const time = { predefinedTime };
                        await updateCategoriesPredifinedtime(categoryId, time, token);
                        console.log(`Updated ${categoryId} with time period: ${predefinedTime}`);
                    }
                })
            );
            handleSuccessToast("Time allocation Successfully Updated");
            await RetriveAllCategories();
        } catch (error) {
            console.error("Error updating categories:", error);
        }
    };

    const handleSubmitDoctorFee = async () => {
        try {
            // Prepare payload with fee
            const feePayload = { fee: doctorFee };

            // Call the API to update doctor channelling fee
            await updateChannelingFee(feePayload, token);
            handleSuccessToast("Doctor channelling fee successfully updated");

            // Optionally, you can refresh the fee after updating
            await RetrieveFee();
        } catch (error) {
            console.error("Error updating doctor fee:", error);
        }
    };

    // Modal Logic
    const openConfirmationModal = (message, action) => {
        setModalMessage(message);
        setConfirmAction(() => action);
        setIsModalVisible(true);
    };

    const confirmModalAction = () => {
        if (confirmAction) confirmAction();
        closeModal();
    };

    const closeModal = () => {
        setIsModalVisible(false);
        setConfirmAction(null);
    };

    return (
        <div className="categories_container">
            <div className="categories_left">
                <h2>Update Time Allocations</h2>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        openConfirmationModal('Are you sure you want to update time allocations?', handleSubmitCategories);
                    }}
                >
                    <div className="categories_columns">
                        <div className="categories_column">
                            {categories.slice(0, 4).map((category, index) => (
                                <div key={category.categoryId} className="categories_form-group">
                                    <label>{category.categoryName}</label>
                                    <input
                                        type="text"
                                        value={category.predefinedTime || ''}
                                        onChange={(e) => handleCategoryChange(index, e.target.value)}
                                        placeholder={`Enter time for ${category.categoryName}`}
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="categories_column">
                            {categories.slice(4).map((category, index) => (
                                <div key={category.categoryId} className="categories_form-group">
                                    <label>{category.categoryName}</label>
                                    <input
                                        type="text"
                                        value={category.predefinedTime || ''}
                                        onChange={(e) => handleCategoryChange(index + 4, e.target.value)}
                                        placeholder={`Enter time for ${category.categoryName}`}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    <button type="submit" className="categories_btn">Update Time Allocations</button>
                </form>
            </div>

            <div className="categories_right">
                <h2>Update Doctor Channelling Fees</h2>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        openConfirmationModal('Are you sure you want to update doctor channelling fees?', handleSubmitDoctorFee);
                    }}
                >
                    <div className="categories_form-group">
                        <label>Doctor Fee</label>
                        <input
                            type="text"
                            value={doctorFee}
                            onChange={handleDoctorFeeChange}
                            placeholder="Enter doctor fee"
                        />
                    </div>
                    <button type="submit" className="categories_btn">Update Doctor Fee</button>
                </form>

            </div>

            {isModalVisible && (
                <ConfirmationModal
                    message={modalMessage}
                    onConfirm={confirmModalAction}
                    onCancel={closeModal}
                />
            )}
            <ToastContainer />
        </div>
    );
}

export default Categories;
