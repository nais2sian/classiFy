import { useParams } from "react-router-dom";
import { getItemById, patchAd } from "../api/adsApi";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adsStore, adsSlice, AdsSliceType } from "../stores/AdStore";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
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
  const dispatch = useDispatch<typeof adsStore.dispatch>();
  const item = useSelector(
    (state: AdsSliceType) => state.selectedAd
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
    <>
      {/* 7.1 Название */}
      {editMode ? (
        <TextField
          variant="standard"
          fullWidth
          label="Name"
          value={draft.name}
          onChange={handleChange("name")}
        />
      ) : (
        <h2>{item.name}</h2>
      )}

      <span>Characteristics:</span>
      {DetailsComponent}

      {/* 7.2 Описание */}
      {editMode ? (
        <TextField
          label="Description"
          multiline
          minRows={3}
          fullWidth
          margin="normal"
          value={draft.description}
          onChange={handleChange("description")}
        />
      ) : (
        <p>About: {item.description}</p>
      )}

      {/* 7.3 Город */}
      {editMode ? (
        <TextField
          label="City"
          fullWidth
          margin="normal"
          value={draft.location}
          onChange={handleChange("location")}
        />
      ) : (
        <p>City: {item.location}</p>
      )}

      {/* 7.4 Кнопки */}
      {!editMode ? (
        <Button variant="contained" onClick={() => setEditMode(true)}>
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
    </>
  );
}

export default ItemPage;
