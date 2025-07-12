import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Select, MenuItem, InputLabel, TextField, Button } from "@mui/material";
import {
  carBrands,
  serviceTypes,
  propertyTypes,
  // type AdFormData,
} from "./formdata";
import styles from "./FormPage.module.css";
// import { putAd } from "../api/adsApi.ts";
import { AdsSliceType } from "../stores/AdStore.ts";

export function EditPage() {
  const { id, type } = useParams();
  const ads = useSelector((state: AdsSliceType) => state.ads);

  if (!id || !type) return <>Missing id/type</>;

  const ad = ads.find((ad) => ad.id === ad.id);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const formData: AdFormData = {
  //     ...(Object.fromEntries(new FormData(e.currentTarget)) as AdFormData),
  //   };

  //   const data = await putAd(formData, Number(id));
  //   console.log("done", data);
  // };

  if (!ad) return <>Ad not found.</>;

  return (
    <>
      <form
      // onSubmit={handleSubmit}
      >
        <div className={styles.field}>
          <TextField
            name="name"
            type="text"
            label="Name"
            placeholder="Enter an ad's name"
            defaultValue={ad.name}
          />
        </div>

        <div className={styles.field}>
          <TextField
            name="description"
            type="text"
            label="Description"
            placeholder="Description"
            defaultValue={ad.description}
          />
        </div>

        <div className={styles.field}>
          <TextField
            name="location"
            type="text"
            label="Location"
            placeholder="Location"
            defaultValue={ad.location}
          />
        </div>

        <div className={styles.field}>
          <TextField
            name="photo"
            type="link"
            label="Photo"
            placeholder="Photo"
            defaultValue={ad.photo}
          />
        </div>

        <div className={styles.field}>
          <InputLabel id="demo-select-small-label">Choose category</InputLabel>
          <Select
            required
            displayEmpty={true}
            name="type"
            value={ad.type}
            disabled
          >
            <MenuItem value="">
              <em>Select a category</em>
            </MenuItem>
            <MenuItem value="AUTO">Auto</MenuItem>
            <MenuItem value="REAL_ESTATE">Real Estate</MenuItem>
            <MenuItem value="SERVICE">Service</MenuItem>
          </Select>
        </div>

        {ad.type === "AUTO" ? (
          <>
            <div className={styles.field}>
              <Select required label="Brand" displayEmpty={true} name="brand">
                <MenuItem value="">Select a brand</MenuItem>
                {carBrands.map((item) => (
                  <MenuItem key={item} value={item} defaultValue={ad.brand}>
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
                defaultValue={ad.model}
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
        ) : ad.type === "SERVICES" ? (
          <>
            <Select
              required
              label="Service"
              displayEmpty={true}
              name="serviceType"
            >
              <MenuItem value="">Select the type of service</MenuItem>
              {serviceTypes.map((item) => (
                <MenuItem key={item} value={item} defaultValue={ad.serviceType}>
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
              defaultValue={ad.experience}
            />
            <TextField
              name="price"
              required
              type="text"
              label="Price"
              placeholder="Price"
              defaultValue={ad.price}
            />
            <TextField
              name="workSchedule"
              type="text"
              label="Work schedule"
              placeholder="Work schedule"
              defaultValue={ad.workSchedule}
            />
          </>
        ) : ad.type === "REAL_ESTATE" ? (
          <>
            <Select
              required
              // value={selectedProperty}
              // onChange={(e) => {
              //   setSelectedProperty(e.target.value);
              // }}
              label="Property type"
              displayEmpty={true}
              name="propertyType"
            >
              <MenuItem value="">Select the type of property</MenuItem>
              {propertyTypes.map((item) => (
                <MenuItem
                  key={item}
                  value={item}
                  defaultValue={ad.propertyType}
                >
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
              defaultValue={ad.area}
            />
            <TextField
              name="rooms"
              required
              type="text"
              label="Rooms"
              placeholder="Rooms"
              defaultValue={ad.rooms}
            />
            <TextField
              name="price"
              required
              type="text"
              label="Price"
              placeholder="Price"
              defaultValue={ad.price}
            />
          </>
        ) : (
          <></>
        )}

        <Button type="submit" variant="contained">
          Save
        </Button>
        {/* zod */}
      </form>
    </>
  );
}
