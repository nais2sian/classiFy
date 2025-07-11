import { ChangeEvent } from "react";
import { TextField, Typography, Stack } from "@mui/material";
import { AutoAd, RealEstateAd, ServicesAd } from "../types";

export type AdKey = keyof AutoAd | keyof RealEstateAd | keyof ServicesAd;

export type UniversalChangeHandler = (
  field: AdKey
) => (e: ChangeEvent<HTMLInputElement>) => void;

/* -------------------------------------------------- */
/* 1.  AUTO                                          */
/* -------------------------------------------------- */
interface AutoDetailsProps {
  item: AutoAd;
  editMode: boolean;
  onChange: UniversalChangeHandler; // ← вместо ChangeHandler<AutoAd>
}

export function AutoDetails({ item, editMode, onChange }: AutoDetailsProps) {
  return (
    <Stack spacing={1} mt={1}>
      {editMode ? (
        <>
          <TextField
            label="Brand"
            value={item.brand ?? ""}
            onChange={onChange("brand")}
          />
          <TextField
            label="Model"
            value={item.model ?? ""}
            onChange={onChange("model")}
          />
          <TextField
            label="Year"
            value={item.year ?? ""}
            onChange={onChange("year")}
            type="number"
          />
          <TextField
            label="Mileage"
            value={item.mileage ?? ""}
            onChange={onChange("mileage")}
            type="number"
          />
        </>
      ) : (
        <>
          <Typography>Brand: {item.brand}</Typography>
          <Typography>Model: {item.model}</Typography>
          <Typography>Year of issue: {item.year}</Typography>
          <Typography>Mileage: {item.mileage}</Typography>
        </>
      )}
    </Stack>
  );
}

/* -------------------------------------------------- */
/* 2.  REAL ESTATE                                    */
/* -------------------------------------------------- */
interface RealEstateDetailsProps {
  item: RealEstateAd;
  editMode: boolean;
  onChange: UniversalChangeHandler;
}

export function RealEstateDetails({
  item,
  editMode,
  onChange,
}: RealEstateDetailsProps) {
  return (
    <Stack spacing={1} mt={1}>
      {editMode ? (
        <>
          <TextField
            label="Property type"
            value={item.propertyType ?? ""}
            onChange={onChange("propertyType")}
          />
          <TextField
            label="Area"
            type="number"
            value={item.area ?? ""}
            onChange={onChange("area")}
          />
          <TextField
            label="Rooms"
            type="number"
            value={item.rooms ?? ""}
            onChange={onChange("rooms")}
          />
          <TextField
            label="Price"
            type="number"
            value={item.price ?? ""}
            onChange={onChange("price")}
          />
        </>
      ) : (
        <>
          <Typography>{item.propertyType}</Typography>
          <Typography>Area: {item.area}</Typography>
          <Typography>Rooms: {item.rooms}</Typography>
          <Typography>Price: {item.price}</Typography>
        </>
      )}
    </Stack>
  );
}

/* -------------------------------------------------- */
/* 3.  SERVICES                                       */
/* -------------------------------------------------- */
interface ServicesDetailsProps {
  item: ServicesAd;
  editMode: boolean;
  onChange: UniversalChangeHandler;
}

export function ServicesDetails({
  item,
  editMode,
  onChange,
}: ServicesDetailsProps) {
  return (
    <Stack spacing={1} mt={1}>
      {editMode ? (
        <>
          <TextField
            label="Service type"
            value={item.serviceType ?? ""}
            onChange={onChange("serviceType")}
          />
          <TextField
            label="Experience"
            value={item.experience ?? ""}
            onChange={onChange("experience")}
          />
          <TextField
            label="Price"
            type="number"
            value={item.price ?? ""}
            onChange={onChange("price")}
          />
          <TextField
            label="Work schedule"
            value={item.workSchedule ?? ""}
            onChange={onChange("workSchedule")}
          />
        </>
      ) : (
        <>
          <Typography>{item.serviceType}</Typography>
          <Typography>Experience: {item.experience}</Typography>
          <Typography>Price: {item.price}</Typography>
          <Typography>Work schedule: {item.workSchedule}</Typography>
        </>
      )}
    </Stack>
  );
}
