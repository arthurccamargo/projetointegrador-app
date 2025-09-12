import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useTheme } from "../../../../theme/useTheme";
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import BusinessIcon from '@mui/icons-material/Business';
import type { UserRoleType } from "../SignUpPage";

interface Props {
  onSelectRole: (role: UserRoleType) => void;
}

function SelectRoleStep({ onSelectRole }: Props) {
  const theme = useTheme();

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={3} width="100%">
      <Typography variant="h5" sx={{ fontWeight: "bold", color: theme.palette.text.primary }} align="center" gutterBottom>
        Como você deseja se cadastrar?
      </Typography>
      
      <Typography variant="body2" sx={{ color: theme.palette.text.primary, mb: 3 }} align="center">
        Escolha uma opção para continuar seu cadastro no HelpHub
      </Typography>

      <Card 
        elevation={2} 
        sx={{ 
          width: '100%', 
          mb: 2, 
          borderRadius: 2,
          transition: 'transform 0.2s',
          cursor: 'pointer',
          '&:hover': {
            transform: 'scale(1.02)',
            boxShadow: 6
          }
        }}
        onClick={() => onSelectRole("VOLUNTEER")}
      >
        <CardContent sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
          <Box sx={{ 
            bgcolor: theme.palette.primary.main, 
            borderRadius: '50%', 
            p: 1.5,
            mr: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <VolunteerActivismIcon sx={{ fontSize: 30, color: theme.palette.common.black }} />
          </Box>
          <Box>
            <Typography variant="h6" fontWeight="bold">Sou Voluntário</Typography>
            <Typography variant="body2" color="common.black">
              Quero ajudar ONGs e participar de ações voluntárias
            </Typography>
          </Box>
        </CardContent>
      </Card>

      <Card 
        elevation={2} 
        sx={{ 
          width: '100%', 
          borderRadius: 2,
          transition: 'transform 0.2s',
          cursor: 'pointer',
          '&:hover': {
            transform: 'scale(1.02)',
            boxShadow: 6
          }
        }}
        onClick={() => onSelectRole("ONG")}
      >
        <CardContent sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
          <Box sx={{ 
            bgcolor: theme.palette.primary.main, 
            borderRadius: '50%', 
            p: 1.5,
            mr: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <BusinessIcon sx={{ fontSize: 30, color: theme.palette.common.black }} />
          </Box>
          <Box>
            <Typography variant="h6" fontWeight="bold">Sou ONG</Typography>
            <Typography variant="body2" color="common.black">
              Quero encontrar voluntários para nossas causas sociais
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default SelectRoleStep;
