import { doctors as baseDoctors } from "../assets/assets";

const specialityLabels = {
  "general-physician": "General Physician",
  gynecologist: "Gynecologist",
  dermatologist: "Dermatologist",
  pediatricians: "Pediatricians",
  neurologist: "Neurologist",
  gastroenterologist: "Gastroenterologist",
};

const makeDoctor = (speciality, index, image) => {
  const firstNames = [
    "Aarav",
    "Ishita",
    "Vihaan",
    "Maya",
    "Kabir",
    "Anika",
    "Rohan",
    "Nisha",
    "Arjun",
    "Meera",
  ];
  const lastNames = [
    "Sharma",
    "Rao",
    "Patel",
    "Iyer",
    "Singh",
    "Nair",
    "Gupta",
    "Kapoor",
  ];

  return {
    id: `${speciality}-${index + 1}`,
    name: `Dr. ${firstNames[index % firstNames.length]} ${lastNames[(index + 2) % lastNames.length]}`,
    speciality: specialityLabels[speciality],
    experience: `${6 + index} Years`,
    successfulCases: 320 + index * 55,
    fee: 500 + index * 120,
    image,
  };
};

const imagePool = baseDoctors.map((doc) => doc.image);

const buildSpecialityDoctors = (specialityKey, startIndex) => {
  return Array.from({ length: 5 }, (_, index) => {
    const image = imagePool[(startIndex + index) % imagePool.length];
    return makeDoctor(specialityKey, index, image);
  });
};

export const specialityDoctors = {
  "general-physician": buildSpecialityDoctors("general-physician", 0),
  gynecologist: buildSpecialityDoctors("gynecologist", 3),
  dermatologist: buildSpecialityDoctors("dermatologist", 6),
  pediatricians: buildSpecialityDoctors("pediatricians", 9),
  neurologist: buildSpecialityDoctors("neurologist", 12),
  gastroenterologist: buildSpecialityDoctors("gastroenterologist", 2),
};

export const specialityPageMeta = {
  "general-physician": {
    title: "General Physician",
    description: "Comprehensive primary care for fever, infections, chronic conditions, and routine wellness management.",
  },
  gynecologist: {
    title: "Gynecologist",
    description: "Specialized women’s healthcare including reproductive wellness, prenatal care, and hormonal health.",
  },
  dermatologist: {
    title: "Dermatologist",
    description: "Skin, hair, and nail care for allergies, acne, eczema, and advanced dermatology treatment plans.",
  },
  pediatricians: {
    title: "Pediatricians",
    description: "Child healthcare experts for growth monitoring, vaccinations, nutrition guidance, and pediatric illnesses.",
  },
  neurologist: {
    title: "Neurologist",
    description: "Neurology specialists for headache, seizure, stroke prevention, and nervous system disorders.",
  },
  gastroenterologist: {
    title: "Gastroenterologist",
    description: "Digestive health specialists for liver, gut, and stomach-related disorders with targeted care.",
  },
};
