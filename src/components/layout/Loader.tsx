import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export function CircularIndeterminate() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        minHeight: 300,
        width: "100%",
        justifyContent: "center",
      }}
    >
      <CircularProgress size={90} />
    </Box>
  );
}
