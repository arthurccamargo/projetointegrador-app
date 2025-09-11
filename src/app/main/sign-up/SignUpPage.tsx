import { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import SelectRoleStep from "./tabs/SelectRoleTab";
import OngDataTab from "./tabs/ong/OngDataTab";
import VolunteerPersonalTab from "./tabs/volunteer/VolunteerPersonalTab";
import VolunteerAddressTab from "./tabs/volunteer/VolunteerAddressTab";
import OngAddressResponsibleTab from "./tabs/ong/OngAddressResponsibleTab";
import type { Volunteer } from "../../types/Volunteer";
import type { Ong } from "../../types/Ong";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../../theme/useTheme";

const steps = ["Tipo de cadastro", "Endereço", "Informações"];

export type UserRoleType = "VOLUNTEER" | "ONG";

const BASEAPI_URL = import.meta.env.VITE_BASEAPI_URL;

function SignUpPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [role, setRole] = useState<UserRoleType | null>(null);

  const [volunteer, setVolunteer] = useState<Partial<Volunteer> | undefined>(
    undefined
  );
  const [ong, setOng] = useState<Partial<Ong> | undefined>(undefined);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const theme = useTheme();

  const navigate = useNavigate();

  const handleNext = async (
    data: UserRoleType | Partial<Volunteer> | Partial<Ong>
  ) => {
    if (activeStep === 0 && typeof data === "string") {
      setRole(data as UserRoleType);
      setActiveStep(1);
    } else if (activeStep === 1 && role === "VOLUNTEER") {
      setVolunteer((prev) => ({ ...prev, ...(data as Partial<Volunteer>) }));
      setActiveStep(2);
    } else if (activeStep === 1 && role === "ONG") {
      setOng((prev) => ({ ...prev, ...(data as Partial<Ong>) }));
      setActiveStep(2);
    } else if (activeStep === 2 && role === "VOLUNTEER") {
      const finalVolunteer = {
        ...volunteer,
        ...(data as Partial<Volunteer>),
        role: "VOLUNTEER",
      };
      setVolunteer(finalVolunteer);
      setLoading(true);
      setError(null);
      setSuccess(false);
      try {
        await axios.post(`${BASEAPI_URL}/users/volunteer`, finalVolunteer);
        setSuccess(true);
        navigate("/sign-in");
      } catch (err: any) {
        setError(
          err?.response?.data?.message || "Erro ao cadastrar voluntário"
        );
      } finally {
        setLoading(false);
      }
    } else if (activeStep === 2 && role === "ONG") {
      const finalOng = {
        ...ong,
        ...(data as Partial<Ong>),
        role: "ONG",
      };
      setOng(finalOng);
      setLoading(true);
      setError(null);
      setSuccess(false);
      try {
        await axios.post(`${BASEAPI_URL}/users/ong`, finalOng);
        setSuccess(true);
        navigate("/sign-in");
      } catch (err: any) {
        setError(err?.response?.data?.message || "Erro ao cadastrar ONG");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleBack = () => {
    if (activeStep === 1) setActiveStep(0);
    else if (activeStep === 2) setActiveStep(1);
  };

  function CustomStepIcon(props: any) {
    const { active, completed, icon } = props;
    const theme = useTheme();

    const isDone = completed || active;
    return (
      <Box
        sx={{
          width: 24,
          height: 24,
          borderRadius: "50%",
          bgcolor: isDone ? theme.palette.primary.main : "#fff",
          border: isDone ? "none" : `2px solid ${theme.palette.common.black}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="body2"
          sx={{
            color: theme.palette.common.black,
            fontWeight: "bold",
            fontSize: 14,
          }}
        >
          {icon}
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: {
          xs: theme.palette.background.paper,
          sm: `linear-gradient(135deg, ${theme.palette.primary.main} 10%, ${theme.palette.background.default} 90%)`,
        },
        display: "flex",
        alignItems: { xs: "flex-start", sm: "center" },
        justifyContent: "center",
        p: { xs: 0, sm: 2 },
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", sm: "90%", md: "70%", lg: "50%", xl: "40%" },
        }}
      >
        <Card
          elevation={3}
          sx={{
            bgcolor: theme.palette.background.paper,
            borderRadius: { xs: 0, sm: 1 },
            minHeight: { xs: "100vh", sm: "auto" },
            width: { xs: "100%", sm: "auto" },
            boxShadow: { xs: "none", sm: 3 },
            display: "flex",
            flexDirection: "column",
            justifyContent: { xs: "center", sm: "flex-start" },
            pb: { xs: 2, sm: 2 },
          }}
        >
          <CardContent>
            <Box maxWidth={500} mx="auto" mt={6}>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Box
                  sx={{
                    width: 64,
                    height: 64,
                    bgcolor: theme.palette.primary.main,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{
                      color: theme.palette.common.black,
                      fontWeight: "bold",
                    }}
                  >
                    H
                  </Typography>
                </Box>
              </Box>
              <Stepper
                activeStep={activeStep}
                sx={{ mb: 4 }}
                alternativeLabel
              >
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel
                      StepIconComponent={CustomStepIcon}
                    >
                      <Typography
                        variant="body2"
                        sx={{ color: theme.palette.common.black }}
                      >
                        {label}
                      </Typography>
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
              {error && (
                <Typography color="error" mb={2}>
                  {error}
                </Typography>
              )}
              {success && (
                <Typography color="primary" mb={2}>
                  Cadastro realizado com sucesso!
                </Typography>
              )}
              {activeStep === 0 && <SelectRoleStep onSelectRole={handleNext} />}
              {activeStep === 1 && role === "VOLUNTEER" && (
                <VolunteerAddressTab
                  defaultValues={volunteer}
                  onNext={handleNext}
                  onBack={handleBack}
                />
              )}
              {activeStep === 1 && role === "ONG" && (
                <OngAddressResponsibleTab
                  defaultValues={ong}
                  onNext={handleNext}
                  onBack={handleBack}
                />
              )}
              {activeStep === 2 && role === "VOLUNTEER" && (
                <VolunteerPersonalTab
                  defaultValues={volunteer}
                  onNext={handleNext}
                  onBack={handleBack}
                />
              )}
              {activeStep === 2 && role === "ONG" && (
                <OngDataTab
                  defaultValues={ong}
                  onNext={handleNext}
                  onBack={handleBack}
                />
              )}
              {loading && (
                <Typography color="primary" mt={2}>
                  Enviando cadastro...
                </Typography>
              )}
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

export default SignUpPage;
