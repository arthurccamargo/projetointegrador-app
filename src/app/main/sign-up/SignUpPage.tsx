import { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import SelectRoleStep from "./tabs/SelectRoleTab";
import OngDataTab from "./tabs/ong/OngDataTab";
import VolunteerPersonalTab from "./tabs/volunteer/VolunteerPersonalTab";
import VolunteerAddressTab from "./tabs/volunteer/VolunteerAddressTab";
import OngAddressResponsibleTab from "./tabs/ong/OngAddressResponsibleTab";
import type { Volunteer } from "../../types/Volunteer";
import type { Ong } from "../../types/Ong";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
        setError(
          err?.response?.data?.message || "Erro ao cadastrar ONG"
        );
      } finally {
        setLoading(false);
      }
    }
  };

  const handleBack = () => {
    if (activeStep === 1) setActiveStep(0);
    else if (activeStep === 2) setActiveStep(1);
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      <Box
        bgcolor="white"
        boxShadow={3}
        borderRadius={3}
        p={5}
        width={430}
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Typography variant="h4" fontWeight="bold" mb={3} color="primary">
          Cadastrar
        </Typography>
        <Box maxWidth={500} mx="auto" mt={6}>
          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
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
      </Box>
    </Box>
  );
}

export default SignUpPage;
