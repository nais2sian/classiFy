import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { SearchBar } from "./SearchBar";
import { Menu as MUIMenu, MenuItem } from "@mui/material";
import { useState, type MouseEvent } from "react";
import { LoginModal } from "./../modal/modal";

type MenuProps = { onSearch: (q: string) => void };

export function Menu({ onSearch }: MenuProps) {
  // The element on which the menu is positioned to (the button)
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState(false);

  const isOpen = menuAnchor !== null; // Doesn't need to be state because it's derived from state
  const closeMenu = () => setMenuAnchor(null);
  const handleMenuClick = (e: MouseEvent<HTMLElement>) => {
    setMenuAnchor(e.currentTarget);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
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
            onClick={handleMenuClick}
            aria-controls={isOpen ? "main-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={isOpen ? "true" : undefined}
            id="main-menu-button"
          >
            <MenuIcon />
          </IconButton>
          <MUIMenu
            id="main-menu"
            aria-labelledby="main-menu-button"
            anchorEl={menuAnchor}
            onClose={closeMenu}
            open={isOpen}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <MenuItem>
              <Link to="/list">Ads list</Link>
            </MenuItem>
            <MenuItem>
              <Link to="/form">Place an ad</Link>
            </MenuItem>
          </MUIMenu>
          <SearchBar onSearch={onSearch} />
          <Button
            variant="text"
            sx={{ color: "white", ml: "auto" }}
            onClick={() => setOpen(true)}
          >
            Login
          </Button>

          <LoginModal open={open} onClose={() => setOpen(false)} />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
