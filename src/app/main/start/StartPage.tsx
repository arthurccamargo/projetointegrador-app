import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";
import LoadingSpinner from "../../shared-components/LoadingSpinner";
import { IS_MOBILE } from "../../utils/platform";
import StartPageMobile from "./mobile/StartPageMobile";
import StartPageWeb from "./web/StartPageWeb";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { lightTheme } from "../../../theme/theme";

function StartPage() {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();

  // Redireciona se já estiver logado
  useEffect(() => {
    if (!isLoading && user) {
      if (user.role === "ONG") {
        navigate("/dashboard", { replace: true });
      } else {
        navigate("/home", { replace: true });
      }
    }
  }, [user, isLoading, navigate]);

  // Mostra LoadingSpinner enquanto verifica autenticação
  if (isLoading) {
    return (
      <LoadingSpinner
        text="Verificando sessão..."
        fullScreen={true}
        size={50}
      />
    );
  }

  // Se já estiver autenticado, não renderiza nada (vai redirecionar)
  if (user) {
    return null;
  }

  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      {IS_MOBILE ? <StartPageMobile /> : <StartPageWeb />}
    </ThemeProvider>
  );
}

export default StartPage;
