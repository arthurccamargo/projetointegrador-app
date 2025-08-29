import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

type NavbarProps = {
  drawerWidth: number;
};

const Navbar: React.FC<NavbarProps> = ({ drawerWidth }) => (
  <Drawer
    variant="permanent"
    anchor="left"
    sx={{
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
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%", p: 2 }}>
      <Typography variant="h6" sx={{ mb: 4, fontWeight: "bold", color: "#fff" }}>
        Navbar
      </Typography>
      <List>
        <ListItem disablePadding>
          <ListItemButton component="a" href="/home">
            <ListItemText primary="Home" sx={{ color: "#fff" }} />
          </ListItemButton>
        </ListItem>
        {/* ...adicione mais links se quiser... */}
      </List>
    </Box>
  </Drawer>
);

export default Navbar;
