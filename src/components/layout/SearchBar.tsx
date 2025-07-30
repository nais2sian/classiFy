import { Paper, InputBase, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
interface SearchBarProps {
  onSearch: (query: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [value, setValue] = useState("");

  return (
    <Paper
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        onSearch(value);
      }}
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: 320,
        marginLeft: "240px",
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
