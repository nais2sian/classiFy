export const carBrands = [
  "Toyota",
  "Honda",
  "Nissan",
  "Mitsubishi",
  "Ford",
  "BMW",
  "Volkswagen",
  "Citröen",
  "Pugeot",
];
export const serviceTypes = [
  "Cleaning",
  "Plumbing",
  "Electrical Repair",
  "Babysitting",
  "Tutoring",
  "IT Support",
  "Landscaping",
  "Moving",
  "Painting",
  "Carpentry"
]
export const propertyTypes = [
  "Apartment",
  "House",
  "Townhouse",
  "Condo",
  "Cottage"
]

export type AdFormData = {
  // general info
  name: string;
  description: string;
  location: string;
  photo: string;
  price?: string;
  type: string;
  // car
  brand?: string;
  model?: string;
  year?: string;
  mileage?: string;
  // service
  serviceType: string;
  experience?: string;
  workSchedule?: string;
  // real estate
  propertyType: string;
  area: string; 
  rooms: string; 
}

export const validateForm = (formData: AdFormData): Record<string, string> => {
    const errors: Record<string, string> = {}

    if (formData.type === 'AUTO') {
      if (isNaN(Number(formData.year))) {
        errors.type = `Year must be a number.`
      }
    }

    return errors
}