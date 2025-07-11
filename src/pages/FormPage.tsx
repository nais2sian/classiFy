import { TextField } from "@mui/material";
import { Select, MenuItem, InputLabel } from "@mui/material";
import Button from "@mui/material/Button";
import { useState } from "react";
// import { type AutoAd } from "../types";
import styles from "./FormPage.module.css";
import {
  carBrands,
  serviceTypes,
  propertyTypes,
  validateForm,
  type AdFormData,
} from "./formdata";
import { postAd } from "../api/adsApi";
import { addAd } from "../stores/AdStore";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
/*
  npm i zod react-hook-form
*/

function FormPage() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [selectedProperty, setSelectedProperty] = useState("");
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormErrors({});

    const formData: AdFormData = {
      ...(Object.fromEntries(new FormData(e.currentTarget)) as AdFormData),
      // name: e.currentTarget.adName.value,
      // location: e.currentTarget.location.value,
      // brand: selectedBrand,
      // serviceType: selectedService,
      // propertyType: selectedProperty,
      // category: selectedCategory,
    };

    console.log("formData:", formData);

    const errors = validateForm(formData);

    if (Object.keys(errors).length > 0) {
      console.log("form errors:", errors);
      setFormErrors(errors);
      return;
    }

    // Send the data
    const newItem = await postAd(formData);
    console.log("newItem:", newItem);
    dispatch(addAd(newItem));
    navigate("/list");
  };

  return (
    <>
      <h1>Place an ad</h1>

      <form onSubmit={handleSubmit}>
        <div className={styles.field}>
          <TextField
            name="name"
            type="text"
            label="Name"
            placeholder="Enter an ad's name"
          />
          <span className="error">{formErrors.adName}</span>
        </div>

        <div className={styles.field}>
          <TextField
            name="description"
            type="text"
            label="Description"
            placeholder="Description"
          />
        </div>

        <div className={styles.field}>
          <TextField
            name="location"
            type="text"
            label="Location"
            placeholder="Location"
          />
        </div>

        <div className={styles.field}>
          <TextField
            name="photo"
            type="link"
            label="Photo"
            placeholder="Photo"
          />
        </div>

        <div className={styles.field}>
          <InputLabel id="demo-select-small-label">Choose category</InputLabel>
          <Select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
            }}
            required
            displayEmpty={true}
            name="type"
          >
            <MenuItem value="">
              <em>Select a category</em>
            </MenuItem>
            <MenuItem value="AUTO">Auto</MenuItem>
            <MenuItem value="REAL_ESTATE">Real Estate</MenuItem>
            <MenuItem value="SERVICE">Service</MenuItem>
          </Select>
        </div>

        {selectedCategory === "AUTO" ? (
          <>
            <div className={styles.field}>
              <Select
                required
                value={selectedBrand}
                onChange={(e) => {
                  setSelectedBrand(e.target.value);
                }}
                label="Brand"
                displayEmpty={true}
                name="brand"
              >
                <MenuItem value="">Select a brand</MenuItem>
                {carBrands.map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </div>

            <div className={styles.field}>
              <TextField
                name="model"
                required
                type="text"
                label="Model"
                placeholder="Model"
              />
            </div>

            <div className={styles.field}>
              <TextField
                name="year"
                required
                type="text"
                label="Year"
                placeholder="Year of issue"
              />
            </div>

            <div className={styles.field}>
              <TextField
                name="mileage"
                type="text"
                label="Mileage"
                placeholder="Mileage"
              />
            </div>
          </>
        ) : selectedCategory === "SERVICES" ? (
          <>
            <Select
              required
              value={selectedService}
              onChange={(e) => {
                setSelectedService(e.target.value);
              }}
              label="Service"
              displayEmpty={true}
              name="serviceType"
            >
              <MenuItem value="">Select the type of service</MenuItem>
              {serviceTypes.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
            <TextField
              name="experience"
              required
              type="text"
              label="Experience"
              placeholder="Experience"
            />
            <TextField
              name="price"
              required
              type="text"
              label="Price"
              placeholder="Price"
            />
            <TextField
              name="workSchedule"
              type="text"
              label="Work schedule"
              placeholder="Work schedule"
            />
          </>
        ) : selectedCategory === "REAL_ESTATE" ? (
          <>
            <Select
              required
              value={selectedProperty}
              onChange={(e) => {
                setSelectedProperty(e.target.value);
              }}
              label="Property type"
              displayEmpty={true}
              name="propertyType"
            >
              <MenuItem value="">Select the type of property</MenuItem>
              {propertyTypes.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
            <TextField
              name="area"
              required
              type="text"
              label="Area"
              placeholder="Area"
            />
            <TextField
              name="rooms"
              required
              type="text"
              label="Rooms"
              placeholder="Rooms"
            />
            <TextField
              name="price"
              required
              type="text"
              label="Price"
              placeholder="Price"
            />
          </>
        ) : (
          <></>
        )}

        <Button type="submit" variant="contained">
          Place an ad
        </Button>
        {/* zod */}
      </form>
    </>
  );
}

export default FormPage;
