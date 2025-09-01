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

const steps = ["Tipo de cadastro", "Informações", "Endereço"];

export type UserRoleType = "VOLUNTEER" | "ONG";

function SignUpPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [role, setRole] = useState<UserRoleType | null>(null);

  const [volunteer, setVolunteer] = useState<Partial<Volunteer> | undefined>(
    undefined
  );
  const [ong, setOng] = useState<Partial<Ong> | undefined>(undefined);

  const handleNext = (
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
      setVolunteer((prev) => ({ ...prev, ...(data as Partial<Volunteer>) }));
      // TO DO: enviar volunteer para a API aqui se desejar
    } else if (activeStep === 2 && role === "ONG") {
      setOng((prev) => ({ ...prev, ...(data as Partial<Ong>) }));
      // TO DO: enviar ong para a API 
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
          {activeStep === 0 && (
            <SelectRoleStep onSelectRole={handleNext} />
          )}
          {activeStep === 1 && role === "VOLUNTEER" && (
            <VolunteerPersonalTab
              defaultValues={volunteer}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}
          {activeStep === 1 && role === "ONG" && (
            <OngDataTab
              defaultValues={ong}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}
          {activeStep === 2 && role === "VOLUNTEER" && (
            <VolunteerAddressTab
              defaultValues={volunteer}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}
          {activeStep === 2 && role === "ONG" && (
            <OngAddressResponsibleTab
              defaultValues={ong}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default SignUpPage;
