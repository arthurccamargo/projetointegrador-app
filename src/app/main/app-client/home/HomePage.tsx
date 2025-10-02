import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from '@mui/material/styles';

export default function HomePage() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
        flex: 1,
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        p: 0,
        m: 0,
        minHeight: "100vh",
        minWidth: "100%",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      <Typography variant="h1">Início</Typography>
      <Typography variant="body1">
        Somente usuários logados podem ver essa página.
      </Typography>
    </Box>
  );
}
