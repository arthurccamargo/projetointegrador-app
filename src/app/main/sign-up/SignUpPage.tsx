import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function SignUpPage() {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      bgcolor="#f5f5f5"
    >
      <Box
        bgcolor="white"
        boxShadow={3}
        borderRadius={3}
        p={5}
        width={350}
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Typography variant="h4" fontWeight="bold" mb={3} color="primary">
          Cadastrar
        </Typography>
      </Box>
    </Box>
  );
}

export default SignUpPage;
