import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
} from "@mui/material";
type LoginModalProps = {
  open: boolean;
  onClose: () => void;
};

export function LoginModal({ open, onClose }: LoginModalProps) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Login</DialogTitle>

      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            fullWidth
            placeholder="Phone or email"
            variant="outlined"
          />
          <TextField
            fullWidth
            placeholder="Password"
            type="password"
            variant="filled"
          />
        </Stack>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "space-between", px: 3, pb: 3 }}>
        <Button variant="text" onClick={() => alert("Reset flow")}>
          Forgot your password?
        </Button>

        <Button variant="contained" onClick={() => alert("Sign in")}>
          LOGIN
        </Button>
      </DialogActions>
    </Dialog>
  );
}
