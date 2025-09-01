import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import type { UserRoleType } from "../SignUpPage";

interface Props {
  onSelectRole: (role: UserRoleType) => void;
}

function SelectRoleStep({ onSelectRole }: Props) {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={3}>
      <Typography variant="h6" mb={2}>
        Como você deseja se cadastrar?
      </Typography>
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={() => onSelectRole("VOLUNTEER")}
        fullWidth
      >
        Sou Voluntário
      </Button>
      <Button
        variant="outlined"
        color="primary"
        size="large"
        onClick={() => onSelectRole("ONG")}
        fullWidth
      >
        Sou ONG
      </Button>
    </Box>
  );
}

export default SelectRoleStep;
