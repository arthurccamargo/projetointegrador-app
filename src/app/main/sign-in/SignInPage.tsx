import { useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Link from "@mui/material/Link";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../../theme/useTheme";
import { useAuth } from "../../auth/useAuth";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const signInSchema = z.object({
  email: z.email("E-mail inválido").nonempty("E-mail obrigatório"),
  password: z.string().min(1, "Senha obrigatória"),
});

type FormData = z.infer<typeof signInSchema>;

function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const theme = useTheme();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setError(null);

    try {
      const user = await signIn(data.email, data.password);
      if (user.role === "ONG") {
        navigate("/dashboard");
      } else {
        navigate("/home");
      }
    } catch (error: any) {
      setError(
        error.message || "Erro ao fazer login. Verifique suas credenciais."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex min-w-0 flex-1 flex-col items-center justify-center"
      style={{
        overflow: "auto",
        minHeight: "100vh",
        background: theme.palette.background.default,
        padding: window.innerWidth >= 600 ? "16px" : "0",
      }}
    >
      <Paper
        className="w-full p-8 rounded-3xl shadow-md"
        sx={{
          backgroundColor: theme.palette.background.paper,
          maxWidth: { xs: "100%", sm: "90%", md: "70%", lg: "50%", xl: "40%" },
          minHeight: { xs: "100vh", sm: "auto" },
          boxShadow: { xs: "none", sm: 3 },
          borderRadius: { xs: 0, sm: 3 },
          display: "flex",
          flexDirection: "column",
          justifyContent: { xs: "center", sm: "flex-start" },
        }}
      >
        <Box className="flex flex-col items-center">
          {/* Logo */}
          <Box
            sx={{
              width: 64,
              height: 64,
              bgcolor: theme.palette.secondary.main,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 2,
            }}
          >
            <Typography
              variant="h4"
              sx={{
                color: theme.palette.primary.main,
                fontWeight: "bold",
              }}
            >
              H
            </Typography>
          </Box>
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              color: theme.palette.text.primary,
              mb: 1,
              textAlign: "center",
            }}
          >
            Entrar no HelpHub
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: theme.palette.text.primary,
              mb: 4,
              textAlign: "center",
              maxWidth: 400,
            }}
          >
            Acesse sua conta para continuar conectando pessoas e causas
          </Typography>
          <Box className="w-full max-w-sm">
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              sx={{ mt: 1 }}
            >
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    margin="normal"
                    fullWidth
                    label="E-mail"
                    type="email"
                    placeholder="seu@email.com"
                    autoComplete="email"
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    InputLabelProps={{
                      shrink: true,
                      style: { color: "#A1A1A1" },
                    }}
                  />
                )}
              />

              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    margin="normal"
                    fullWidth
                    label="Senha"
                    type={showPassword ? "text" : "password"}
                    placeholder="Sua senha"
                    autoComplete="current-password"
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    InputLabelProps={{
                      shrink: true,
                      style: { color: "#A1A1A1" },
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowPassword((show) => !show)}
                            edge="end"
                            sx={{ color: theme.palette.text.primary }}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />

              {error && (
                <Typography
                  color="error"
                  sx={{ mt: 1, mb: 1, textAlign: "center", fontSize: "14px" }}
                >
                  {error}
                </Typography>
              )}

              <Box display="flex" justifyContent="flex-end" mb={2}>
                <Button
                  component={Link}
                  variant="text"
                  sx={{
                    textTransform: "none",
                    fontSize: 14,
                    color: theme.palette.text.primary,
                    textDecoration: "underline",
                  }}
                >
                  Esqueceu a senha?
                </Button>
              </Box>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={loading}
                sx={{
                  py: 1.5,
                  fontWeight: "bold",
                  borderRadius: 30,
                  fontSize: 16,
                  bgcolor: theme.palette.secondary.main,
                  color: theme.palette.common.black,
                  "&:hover": { bgcolor: theme.palette.primary.contrastText },
                }}
              >
                {loading ? "Entrando..." : "Entrar"}
              </Button>
            </Box>
            <Box mt={4} textAlign="center">
              <Typography
                variant="body2"
                sx={{ color: theme.palette.text.primary }}
              >
                Ainda não tem uma conta?{" "}
                <Button
                  component={Link}
                  onClick={() => navigate("/sign-up")}
                  variant="text"
                  sx={{
                    textTransform: "none",
                    fontWeight: "bold",
                    fontSize: 14,
                    color: theme.palette.text.primary,
                    textDecoration: "underline",
                  }}
                >
                  Cadastre-se aqui
                </Button>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>
    </div>
  );
}

export default SignInPage;
