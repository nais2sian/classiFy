import { useParams } from "react-router-dom";
import { getItemById, patchAd } from "../api/adsApi";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adsSlice, AdsSliceState } from "../stores/AdStore";
import SaveIcon from "@mui/icons-material/Save";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Paper } from "@mui/material";

import {
  AutoDetails,
  RealEstateDetails,
  ServicesDetails,
  UniversalChangeHandler,
} from "../components/CategoryDetails";
import { Ad, AdType } from "../types";
import { Button, IconButton, Stack, TextField } from "@mui/material";

type ItemParams = {
  type: AdType; // 'AUTO' | 'REAL_ESTATE' | 'SERVICES'
  id: string;
};

function ItemPage() {
  const { type, id } = useParams<ItemParams>();
  const dispatch = useDispatch();
  const item = useSelector(
    (state: AdsSliceState) => state.selectedAd
  ) as Ad | null;

  /** editMode - просмотр / редактирование */
  const [editMode, setEditMode] = useState(false);
  /** draft - локальная копия, чтобы не портить данные до «Сохранить» */
  const [draft, setDraft] = useState<Ad | null>(null);

  useEffect(() => {
    if (!type || !id) return;
    getItemById(type, parseInt(id)).then((res) =>
      dispatch(adsSlice.actions.setSelectedAd(res))
    );
  }, [type, id, dispatch]);

  useEffect(() => {
    if (item) setDraft(item);
  }, [item]);

  if (!item || !draft) return <>Loading…</>;

  /* ------------------------------------------------------------------
   * 5. Обработчики
   * ------------------------------------------------------------------ */
  const handleChange: UniversalChangeHandler = (field) => (e) =>
    setDraft((prev) =>
      prev ? ({ ...prev, [field]: e.target.value } as Ad) : prev
    );

  const handleSave = async () => {
    await patchAd(draft, draft.id);
    dispatch(adsSlice.actions.setSelectedAd(draft));
    setEditMode(false);
    dispatch(adsSlice.actions.updateItem(draft));
  };

  const handleCancel = () => {
    setDraft(item);
    setEditMode(false);
  };

  let DetailsComponent: React.ReactElement | null = null;
  if (draft.type === "AUTO") {
    DetailsComponent = (
      <AutoDetails item={draft} editMode={editMode} onChange={handleChange} />
    );
  } else if (draft.type === "REAL_ESTATE") {
    DetailsComponent = (
      <RealEstateDetails
        item={draft}
        editMode={editMode}
        onChange={handleChange}
      />
    );
  } else {
    DetailsComponent = (
      <ServicesDetails
        item={draft}
        editMode={editMode}
        onChange={handleChange}
      />
    );
  }

  return (
    <Box display="flex" justifyContent="center" mt={4}>
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          maxWidth: 1000,
          p: 3,
        }}
      >
        {editMode ? (
          <TextField
            variant="standard"
            fullWidth
            label="Name"
            value={draft.name}
            onChange={handleChange("name")}
          />
        ) : (
          <Typography variant="h3">{item.name}</Typography>
        )}

        <Stack spacing={1} mt={2}>
          {editMode ? (
            <>
              {draft.photo && (
                <img
                  src={draft.photo}
                  alt="Preview"
                  style={{
                    maxWidth: "100%",
                    maxHeight: 300,
                    objectFit: "contain",
                  }}
                />
              )}
              <TextField
                label="Image URL"
                fullWidth
                margin="normal"
                value={draft.photo}
                onChange={handleChange("photo")}
              />
            </>
          ) : (
            item.photo && (
              <img
                src={item.photo}
                alt={item.name}
                style={{
                  maxWidth: "100%",
                  maxHeight: 300,
                  objectFit: "contain",
                }}
              />
            )
          )}
        </Stack>

        <Typography variant="h6">Characteristics:</Typography>
        {DetailsComponent}

        {/* Общие поля */}
        <Stack spacing={1} mt={1}>
          {editMode ? (
            <>
              <TextField
                label="Description"
                multiline
                minRows={3}
                fullWidth
                margin="normal"
                value={draft.description}
                onChange={handleChange("description")}
              />
              <TextField
                label="City"
                fullWidth
                margin="normal"
                value={draft.location}
                onChange={handleChange("location")}
              />
            </>
          ) : (
            <>
              <Typography>About: {item.description}</Typography>
              <Typography>City: {item.location}</Typography>
            </>
          )}
        </Stack>

        {/* 7.4 Кнопки */}
        {!editMode ? (
          <Button
            sx={{ marginTop: "30px" }}
            variant="contained"
            onClick={() => setEditMode(true)}
          >
            Edit
          </Button>
        ) : (
          <Stack direction="row" spacing={1}>
            <IconButton color="primary" onClick={handleSave}>
              <SaveIcon />
            </IconButton>
            <IconButton onClick={handleCancel}>
              <CloseIcon />
            </IconButton>
          </Stack>
        )}
      </Paper>
    </Box>
  );
}

export default ItemPage;
