import React, { useState } from "react";
import InformationCard from "./InformationCard";
import TreatmentModal from "./TreatmentModal";
import "./Info.css";
import About from "../../Components/About"


function Treatments() {
  const [showAll, setShowAll] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTreatment, setSelectedTreatment] = useState(null);

  const treatments = [
    { title: "Orthopedic Treatment",
      img: "images/ortho.jpg",
      details: "Orthopedic problems in Ayurveda are usually linked to an imbalance in the Vata dosha,which governs movement and functions in the body. Conditions like arthritis, joint pain, and back problems are common.",
      treatment : "A full-body massage with warm, medicated oils like Mahanarayana oil to reduce joint stiffness and improve mobility."
    },
    { title: "Sciatica Pain Treatment",
      img: "images/sciatica.jpg",
      details: "Sciatica is known as Gridhrasi in Ayurveda, typically caused by aggravated Vata and sometimes Kapha doshas. The treatment aims to balance these doshas and relieve nerve compression.",
      treatment : "Herbs like Rasna, Guggulu, and Nirgundi are commonly used for reducing pain and inflammation."
    },
    { title: "Panchakarma Treatment",
      img: "images/pancha.jpg",
      details: "Panchakarma is a core Ayurvedic detoxification and rejuvenation therapy, aimed at cleansing the body and mind of toxins (Ama) and balancing the three doshas (Vata, Pitta, Kapha).",
       treatment : "Herbal or oil enemas to treat Vata-related disorders, particularly beneficial for back pain, sciatica, and arthritis."
    },
    { title: "Neurology Treatment",
      img: "images/neurology.png",
      details: "Neurological conditions in Ayurveda are generally associated with imbalances in the Vata dosha, as Vata controls the nervous system. Conditions like epilepsy, paralysis, and migraines are addressed through dosha balancing.",
      treatment : "Brahmi, Ashwagandha, and Shankhapushpi are used to improve cognitive function, reduce stress, and nourish the nervous system."
    },
    { title: "Pulmonology Treatment",
      img: "images/pulmonology.jpg",
      details: "Respiratory issues like asthma, bronchitis, and cough are linked to an imbalance in the Kapha and Vata doshas. Ayurvedic treatment focuses on clearing excess Kapha from the lungs and improving lung function.",
      treatment : "Use of herbs like Tulsi, Pippali, Licorice, and Vasa to clear mucus, relieve cough, and treat asthma and bronchitis."
    },
    { title: "Cardiology Treatment",
      img: "images/cardiology.jpg",
      details: "Heart-related conditions are seen as an imbalance primarily in the Vata and Pitta doshas. Ayurveda focuses on strengthening the heart and improving circulation.",
      treatment : "A full-body massage with medicated oils to calm Vata and promote blood circulation, lowering stress on the heart."
    },
    { title: "General Medicine",
      img: "images/general-medicine.jpg",
      details: "General medical conditions, from digestive issues to fever and infections, are treated based on the balance of the three doshas. Ayurveda focuses on holistic care, addressing the root cause rather than just symptoms.",
      treatment : "Use of herbs like Chyawanprashawa, Ashwagandha, and Amalaki to boost immunity, vitality, and overall health."
    },
    { title: "Pharmacy",
      img: "images/pharmacy.jpg",
      details: "Ayurveda has its own pharmacology system based on herbal formulations, minerals, and other natural ingredients. Ayurvedic medications are aimed at maintaining health and treating specific conditions without side effects.",
      treatment : "Medicines like Chyawanprash (for immunity), Dashamoolarishta (for respiratory issues), and Ashwagandharishta (for strength and vitality) are common."
    },
    { title: "Immunization",
      img: "images/immunization.jpg",
      details: " In Ayurveda, immunity is referred to as Ojas, the vital energy that protects the body from disease. Immunity is enhanced through diet, lifestyle, and specific herbal preparations.",
      treatment : "Medicines like Chyawanprash (for immunity), Dashamoolarishta (for respiratory issues), and Ashwagandharishta (for strength and vitality) are common."
    }
  ];

  const toggleShowAll = () => {
    setShowAll((prevShowAll) => !prevShowAll);
  };

  const openModal = (treatment) => {
    setSelectedTreatment(treatment);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedTreatment(null);
  };

  const displayedTreatments = showAll ? treatments : treatments.slice(0, 3);

  return (
    <div className="info-section" id="services">
      <About />
      <div className="info-cards-content">
        {displayedTreatments.map((treatment, index) => (
          <div key={index} className="treatment-card" onClick={() => openModal(treatment)}>
            <InformationCard
              title={treatment.title}
              img={treatment.img}
              icon={treatment.icon}
            />
          </div>
        ))}
      </div>
      <button className="treat-see-all" type="button" onClick={toggleShowAll}>
        {showAll ? "See Less" : "See All"}
      </button>
      {selectedTreatment && (
        <TreatmentModal show={modalVisible} onClose={closeModal} treatment={selectedTreatment} />
      )}
    </div>
  );
}

export default Treatments;
