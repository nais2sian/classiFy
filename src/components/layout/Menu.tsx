import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import styles from "./Menu.module.css";
import { SearchBar } from "./SearchBar";

type MenuProps = { onSearch: (q: string) => void };

export function Menu({ onSearch }: MenuProps) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        className={styles.navBar}
        // sx={{ backgroundColor: "success.main" }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{
              display: {
                xs: "none",
                md: "block",
              },
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ marginRight: "50px" }}>
            <Link to="/list">Ads list</Link>
          </Typography>
          <Typography variant="h6" component="div" sx={{ marginRight: "50px" }}>
            <Link to="/form">Place an ad</Link>
          </Typography>
          <SearchBar onSearch={onSearch} />
          <Button>Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
