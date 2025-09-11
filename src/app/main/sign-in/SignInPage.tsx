import React, { useState } from "react"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardHeader from "@mui/material/CardHeader"
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import InputAdornment from "@mui/material/InputAdornment"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import Link from "@mui/material/Link"
import { useNavigate } from "react-router-dom"
import { useTheme } from "../../../theme/useTheme"

function SignInPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const navigate = useNavigate();
  const theme = useTheme();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement login logic
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
      <Box sx={{ width: { xs: '100%', sm: '90%', md: '70%', lg: '50%', xl: '40%' } }}>
        <Card 
          elevation={3} 
          sx={{ 
            bgcolor: theme.palette.background.paper,
            borderRadius: { xs: 0, sm: 1 },
            minHeight: { xs: '100vh', sm: 'auto' },
            width: { xs: '100%', sm: 'auto' },
            boxShadow: { xs: 'none', sm: 3 },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: { xs: 'center', sm: 'flex-start' },
            pb: { xs: 2, sm: 2 }
          }}
        >
          <CardHeader
            sx={{
              pt: { xs: 4, sm: 2 }
            }}
            title={
              <Box display="flex" flexDirection="column" alignItems="center">
                <Box
                  sx={{
                    width: 64,
                    height: 64,
                    bgcolor: theme.palette.primary.main,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 2,
                  }}
                >
                  <Typography variant="h4" sx={{ color: theme.palette.common.black, fontWeight: "bold" }}>
                    H
                  </Typography>
                </Box>
                <Typography variant="h5" sx={{ fontWeight: "bold", color: theme.palette.text.primary }} gutterBottom>
                  Entrar no HelpHub
                </Typography>
                <Typography variant="body2" sx={{ color: theme.palette.text.primary }} align="center">
                  Acesse sua conta para continuar conectando pessoas e causas
                </Typography>
              </Box>
            }
          />
          <CardContent>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                fullWidth
                id="email"
                label="E-mail"
                type="email"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                autoComplete="email"
                InputLabelProps={{ shrink: true, style: { color: theme.palette.text.primary } }}
              />
              <TextField
                margin="normal"
                fullWidth
                id="password"
                label="Senha"
                type={showPassword ? "text" : "password"}
                placeholder="Sua senha"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                autoComplete="current-password"
                InputLabelProps={{ shrink: true, style: { color: theme.palette.text.primary } }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword((show) => !show)}
                        edge="end"
                        sx={{ color: theme.palette.primary.main }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Box display="flex" justifyContent="flex-end" mb={2}>
                <Button
                  component={Link}
                  variant="text"
                  sx={{ textTransform: "none", fontSize: 14, color: theme.palette.primary.contrastText, textDecoration: "underline" }}
                >
                  Esqueceu a senha?
                </Button>
              </Box>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ py: 1.5, fontWeight: "bold", fontSize: 16, bgcolor: theme.palette.primary.main, color: theme.palette.common.black, '&:hover': { bgcolor: theme.palette.primary.contrastText } }}
              >
                Entrar
              </Button>
            </Box>
            <Box mt={4} textAlign="center">
              <Typography variant="body2" sx={{ color: theme.palette.text.primary }}>
                Ainda não tem uma conta?{" "}
                <Button
                  component={Link}
                  onClick={() => navigate('/sign-up')}
                  variant="text"
                  sx={{ textTransform: "none", fontWeight: "bold", fontSize: 14, color: theme.palette.primary.contrastText, textDecoration: "underline" }}
                >
                  Cadastre-se aqui
                </Button>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  )
}

export default SignInPage
