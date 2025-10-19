import { useState } from "react";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material/styles";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, CalendarIcon, User, Calendar } from "lucide-react";
import { useAuth } from "../../auth/useAuth";

type NavbarProps = {
  drawerWidth: number;
};

const Navbar: React.FC<NavbarProps> = ({ drawerWidth }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = useState(location.pathname);
  const { user } = useAuth();

  // rota inicial baseada no role
  const homeRoute = user?.role === "ONG" ? "/dashboard" : "/home";
  const eventRoute = user?.role === "ONG" ? "/events" : "/applications";

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    navigate(newValue);
  };

  return (
    <>
      {/* Desktop Sidebar - oculta em mobile */}
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          display: { xs: "none", md: "block" },
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            bgcolor: "#22223b",
            color: "#fff",
            borderRight: 0,
          },
        }}
        PaperProps={{
          elevation: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            p: 2,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              mb: 4,
              fontWeight: "bold",
              color: theme.palette.background.default,
            }}
          >
            HelpHub
          </Typography>
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate(homeRoute)}>
                <Home size={24} style={{ marginRight: 16 }} />
                <ListItemText
                  primary="Início"
                  sx={{ color: theme.palette.text.secondary }}
                />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate(eventRoute)}>
                <CalendarIcon size={24} style={{ marginRight: 16 }} />
                <ListItemText primary="Eventos" sx={{ color: "#fff" }} />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate("/profile")}>
                <User size={24} style={{ marginRight: 16 }} />
                <ListItemText primary="Perfil" sx={{ color: "#fff" }} />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* Mobile Bottom Navigation - aparece apenas em mobile */}
      <Paper
        sx={{
          position: "fixed",
          bottom: 16,
          left: "50%",
          transform: "translateX(-50%)",
          display: { xs: "block", md: "none" },
          zIndex: 1000,
          borderRadius: 50,
          width: "auto",
          maxWidth: "90%",
        }}
        elevation={3}
      >
        <BottomNavigation
          value={value}
          onChange={handleChange}
          showLabels={false}
          sx={{
            bgcolor: theme.palette.primary.main,
            borderRadius: 50,
            padding: "8px 16px",
            "& .MuiBottomNavigationAction-root": {
              color: "#9ca3af",
              minWidth: "auto",
              borderRadius: 50,
              padding: "8px 24px",
              transition: "all 0.3s ease",
              "&.Mui-selected": {
                color: "#fff",
                bgcolor: "rgba(255, 255, 255, 0.1)",
              },
            },
          }}
        >
          <BottomNavigationAction value={homeRoute} icon={<Home size={24} />} />
          <BottomNavigationAction
            value={eventRoute}
            icon={<Calendar size={24} />}
          />
          <BottomNavigationAction value="/profile" icon={<User size={24} />} />
        </BottomNavigation>
      </Paper>
    </>
  );
};

export default Navbar;
