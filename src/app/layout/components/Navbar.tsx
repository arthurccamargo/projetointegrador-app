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
import { Home, CalendarIcon, User, Calendar, Bell } from "lucide-react";
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
  const eventRoute = user?.role === "ONG" ? "/history" : "/applications"; // alterar /events
  const notificationsRoute =
    user?.role === "ONG" ? "/notifications-ong" : "/notifications-volunteer";

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
            bgcolor: theme.palette.primary.main,
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
              color: theme.palette.secondary.main,
            }}
          >
            HelpHub
          </Typography>
          <List>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => navigate(homeRoute)}
                sx={{
                  bgcolor:
                    location.pathname === homeRoute
                      ? "rgba(255, 255, 255, 0.1)"
                      : "transparent",
                  borderRadius: 10,
                  mb: 1,
                  "&:hover": {
                    bgcolor: "rgba(255, 255, 255, 0.05)",
                  },
                }}
              >
                <Home size={24} style={{ marginRight: 16 }} />
                <ListItemText
                  primary="Início"
                  sx={{ color: theme.palette.success.contrastText }}
                />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                onClick={() => navigate(eventRoute)}
                sx={{
                  bgcolor:
                    location.pathname === eventRoute
                      ? "rgba(255, 255, 255, 0.1)"
                      : "transparent",
                  borderRadius: 10,
                  mb: 1,
                  "&:hover": {
                    bgcolor: "rgba(255, 255, 255, 0.05)",
                  },
                }}
              >
                <CalendarIcon size={24} style={{ marginRight: 16 }} />
                <ListItemText
                  primary={user?.role === "ONG" ? "Histórico" : "Candidaturas"}
                  sx={{ color: "#fff" }}
                />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                onClick={() => navigate(notificationsRoute)}
                sx={{
                  bgcolor:
                    location.pathname === notificationsRoute
                      ? "rgba(255, 255, 255, 0.1)"
                      : "transparent",
                  borderRadius: 10,
                  mb: 1,
                  "&:hover": {
                    bgcolor: "rgba(255, 255, 255, 0.05)",
                  },
                }}
              >
                <Bell size={24} style={{ marginRight: 16 }} />
                <ListItemText
                  primary="Notificações"
                  sx={{ color: theme.palette.success.contrastText }}
                />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                onClick={() => navigate("/profile")}
                sx={{
                  bgcolor:
                    location.pathname === "/profile"
                      ? "rgba(255, 255, 255, 0.1)"
                      : "transparent",
                  borderRadius: 10,
                  "&:hover": {
                    bgcolor: "rgba(255, 255, 255, 0.05)",
                  },
                }}
              >
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
          <BottomNavigationAction
            value={notificationsRoute}
            icon={<Bell size={24} />}
          />
          <BottomNavigationAction value="/profile" icon={<User size={24} />} />
        </BottomNavigation>
      </Paper>
    </>
  );
};

export default Navbar;
