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

  // Estados separados para cada etapa
  const [volunteer, setVolunteer] = useState<Partial<Volunteer> | undefined>(
    undefined
  );
  const [ong, setOng] = useState<Partial<Ong> | undefined>(undefined);

  const handleSelectRole = (selectedRole: UserRoleType) => {
    setRole(selectedRole);
    setActiveStep(1);
  };

  // Handlers para avançar steps
  // Step 1: Dados pessoais
  const handleVolunteerPersonalNext = (data: Partial<Volunteer>) => {
    setVolunteer((prev) => ({ ...prev, ...data }));
    setActiveStep(2);
  };

  // Step 2: Endereço e experiências
  const handleVolunteerAddressNext = (data: Partial<Volunteer>)=> {
    setVolunteer((prev) => {
      if (!prev) return prev;
      return { ...prev, ...data };
    });
    // enviar volunteer para a API
  };

  // Step 1: Dados da ONG
  const handleOngDataNext = (data: Partial<Ong>) => {
    setOng((prev) => ({ ...prev, ...data }));
    setActiveStep(2);
  };

  // Step 2: Endereço e responsável da ONG
  const handleOngAddressNext = (data: Partial<Ong>) => {
    setOng((prev) => {
      if (!prev) return prev;
      return { ...prev, ...data };
    });
    // enviar ong para a API
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
            <SelectRoleStep onSelectRole={handleSelectRole} />
          )}
          {activeStep === 1 && role === "VOLUNTEER" && (
            <VolunteerPersonalTab
              defaultValues={volunteer}
              onNext={handleVolunteerPersonalNext}
              onBack={() => setActiveStep(0)}
            />
          )}
          {activeStep === 1 && role === "ONG" && (
            <OngDataTab
              defaultValues={ong}
              onNext={handleOngDataNext}
              onBack={() => setActiveStep(0)}
            />
          )}
          {activeStep === 2 && role === "VOLUNTEER" && (
            <VolunteerAddressTab
              defaultValues={volunteer}
              onNext={handleVolunteerAddressNext}
              onBack={() => setActiveStep(1)}
            />
          )}
          {activeStep === 2 && role === "ONG" && (
            <OngAddressResponsibleTab
              defaultValues={ong}
              onNext={handleOngAddressNext}
              onBack={() => setActiveStep(1)}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default SignUpPage;
