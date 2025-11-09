import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
  Stack,
  Avatar,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Favorite,
  People,
  TrackChanges,
  ArrowForward,
  FlashOn,
  Security,
  Public,
  Check,
  BatteryFull,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function StartPageWeb() {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const features = [
    {
      title: "Busca Inteligente",
      description: "Encontre oportunidades que combinam com você",
    },
    {
      title: "Gestão Simplificada",
      description: "Acompanhe suas candidaturas e doações em tempo real",
    },
    {
      title: "Comunicação Direta",
      description: "Chat integrado com ONGs e outros voluntários",
    },
    {
      title: "Impacto Visível",
      description: "Veja o resultado concreto de suas ações",
    },
  ];

  const benefits = [
    {
      icon: <Public sx={{ fontSize: 32 }} />,
      title: "Centralização das Oportunidades",
      description:
        "Encontre todas as oportunidades de voluntariado em um único lugar, organizado e fácil de filtrar.",
    },
    {
      icon: <Security sx={{ fontSize: 32 }} />,
      title: "Avaliações Confiáveis",
      description:
        "Avaliações verificadas de voluntários e ONGs criam um ambiente de confiança e segurança.",
    },
    {
      icon: <FlashOn sx={{ fontSize: 32 }} />,
      title: "Comunicação Facilitada",
      description:
        "Chat integrado e notificações mantêm voluntários e ONGs sempre conectados e informados.",
    },
    {
      icon: <Favorite sx={{ fontSize: 32 }} />,
      title: "Impacto Mensurável",
      description:
        "Acompanhe e visualize o impacto real que suas ações e doações geram nas comunidades.",
    },
    {
      icon: <People sx={{ fontSize: 32 }} />,
      title: "Comunidade Engajada",
      description:
        "Conecte-se com pessoas que compartilham seus valores e causas que você apoiar.",
    },
    {
      icon: <TrackChanges sx={{ fontSize: 32 }} />,
      title: "Fácil de Usar",
      description:
        "Interface intuitiva e mobile-first que funciona perfeitamente em qualquer dispositivo.",
    },
  ];

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: theme.palette.background.default }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark || theme.palette.primary.main} 100%)`,
          color: theme.palette.primary.contrastText,
          position: "relative",
          overflow: "hidden",
          py: { xs: 10, md: 14 },
        }}
      >
        {/* Decorative background */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            opacity: 0.1,
            "&::before, &::after": {
              content: '""',
              position: "absolute",
              width: 288,
              height: 288,
              bgcolor: theme.palette.secondary.main,
              borderRadius: "50%",
              filter: "blur(60px)",
              mixBlendMode: "multiply",
            },
            "&::before": {
              top: 40,
              right: 40,
            },
            "&::after": {
              bottom: -32,
              left: 40,
            },
          }}
        />

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Box
            sx={{
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
            }}
          >
            <Box sx={{ maxWidth: 900 }}>
              <Typography
                variant={isMobile ? "h3" : "h2"}
                component="h1"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  lineHeight: 1.2,
                }}
              >
                Conecte-se a causas reais.
                <Box
                  component="span"
                  sx={{
                    display: "block",
                    color: theme.palette.secondary.main,
                    mt: 1,
                  }}
                >
                  Faça a diferença
                </Box>
              </Typography>
              <Typography
                variant="h6"
                sx={{ opacity: 0.95, maxWidth: 800, mx: "auto" }}
              >
                Uma plataforma que une ONGs e voluntários em um só lugar.
                Transforme sua vontade de ajudar em ações concretas.
              </Typography>
            </Box>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              sx={{ pt: 2, width: { xs: "100%", sm: "auto" } }}
            >
              <Button
                variant="contained"
                size="large"
                endIcon={<ArrowForward />}
                onClick={() => navigate("/sign-up")}
                sx={{
                  bgcolor: theme.palette.secondary.main,
                  color: theme.palette.secondary.contrastText,
                  px: 4,
                  py: 1.5,
                  fontSize: { xs: "1rem", md: "1.125rem" },
                  fontWeight: 600,
                  borderRadius: 3,
                  boxShadow: 3,
                  "&:hover": {
                    bgcolor:
                      theme.palette.secondary.dark ||
                      theme.palette.secondary.main,
                    filter: "brightness(0.9)",
                  },
                }}
              >
                Quero Fazer a Diferença
              </Button>
            </Stack>
          </Box>
        </Container>
      </Box>

      {/* Hero Image 
      <Box sx={{ py: { xs: 6, md: 8 }, bgcolor: theme.palette.background.default }}>
        <Container maxWidth="lg">
          <Box
            component="img"
            src="/people-collaborating-volunteering-helping-communit.jpg"
            alt="Pessoas colaborando em ações voluntárias"
            sx={{
              width: '100%',
              maxWidth: 896,
              height: 'auto',
              borderRadius: 6,
              boxShadow: 6,
              mx: 'auto',
              display: 'block'
            }}
          />
        </Container>
      </Box>
      */}

      {/* Como o HelpHub Funciona */}
      <Box
        sx={{
          py: { xs: 10, md: 14 },
          bgcolor: theme.palette.background.default,
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Typography
              variant={isMobile ? "h4" : "h3"}
              component="h2"
              sx={{ fontWeight: 700, color: theme.palette.text.primary, mb: 2 }}
            >
              Como o HelpHub Funciona
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Três passos simples para começar a fazer diferença
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 4,
            }}
          >
            {[
              {
                step: 1,
                title: "ONGs Cadastram Ações",
                description:
                  "Organizações publicam suas oportunidades de voluntariado, detalham as necessidades e compartilham seu propósito social.",
              },
              {
                step: 2,
                title: "Voluntários se Candidatam",
                description:
                  "Pessoas interessadas em ajudar encontram oportunidades que combinam com seus interesses e disponibilidade.",
              },
              {
                step: 3,
                title: "Ajudas Acontecem",
                description:
                  "Conexões são feitas, voluntários e ONGs colaboram, e o impacto social real começa a acontecer.",
              },
            ].map((item) => (
              <Box
                key={item.step}
                sx={{
                  width: { xs: 250, sm: 280, md: 330 },
                  height: { xs: 250, sm: 280, md: 300 },
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  bgcolor: theme.palette.background.paper,
                  border: "2px solid",
                  borderColor:
                    theme.palette.mode === "dark"
                      ? "rgba(255, 255, 255, 0.12)"
                      : "rgba(0, 0, 0, 0.12)",
                  borderRadius: 4,
                  transition: "all 0.3s",
                  "&:hover": {
                    boxShadow: 6,
                    borderColor: theme.palette.secondary.main,
                    transform: "translateY(-4px)",
                  },
                }}
              >
                <Avatar
                  sx={{
                    width: 64,
                    height: 64,
                    bgcolor: theme.palette.primary.main,
                    color: theme.palette.secondary.main,
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    mb: 2,
                  }}
                >
                  {item.step}
                </Avatar>
                <Typography
                  variant="h6"
                  sx={{
                    color: theme.palette.text.primary,
                    fontWeight: 600,
                    mb: 1,
                  }}
                >
                  {item.title}
                </Typography>
                <Typography
                  color="text.secondary"
                  sx={{ px: 2, fontSize: "0.95rem" }}
                >
                  {item.description}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* App Showcase */}
      {/* App Showcase */}
      <Box
        sx={{
          py: { xs: 10, md: 14 },
          bgcolor: theme.palette.background.paper,
        }}
      >
        <Container maxWidth="lg">
          {/* Título e subtítulo */}
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Typography
              variant={isMobile ? "h4" : "h3"}
              component="h2"
              sx={{ fontWeight: 700, color: theme.palette.text.primary, mb: 2 }}
            >
              Uma Plataforma Moderna e Intuitiva
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Design mobile-first pensado para você. Simples, rápido e
              eficiente.
            </Typography>
          </Box>

          {/* Container principal com mockup + features lado a lado */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
              justifyContent: "center",
              gap: { xs: 8, md: 12 },
            }}
          >
            {/* Phone Mockup */}
            <Box
              sx={{
                position: "relative",
                width: { xs: 260, sm: 300, md: 320 },
                flexShrink: 0,
              }}
            >
              <Paper
                elevation={8}
                sx={{
                  bgcolor: theme.palette.primary.main,
                  borderRadius: 6,
                  p: 1.5,
                  position: "relative",
                  aspectRatio: "9/19.5",
                }}
              >
                <Box
                  sx={{
                    bgcolor: theme.palette.background.default,
                    borderRadius: 4,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden",
                  }}
                >
                  {/* Phone header */}
                  <Box
                    sx={{
                      bgcolor: theme.palette.primary.main,
                      height: 32,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      px: 2,
                      color: theme.palette.primary.contrastText,
                      fontSize: "0.75rem",
                    }}
                  >
                    <span>9:41</span>
                    <BatteryFull sx={{ fontSize: 16 }} />
                  </Box>

                  {/* App content */}
                  <Box
                    sx={{
                      flex: 1,
                      p: 2,
                      bgcolor: theme.palette.background.default,
                      overflow: "auto",
                    }}
                  >
                    <Box sx={{ mb: 2 }}>
                      <Box
                        sx={{
                          height: 12,
                          bgcolor: theme.palette.primary.main,
                          borderRadius: 1,
                          width: 96,
                          mb: 1,
                        }}
                      />
                      <Box
                        sx={{
                          height: 8,
                          bgcolor:
                            theme.palette.mode === "dark"
                              ? "rgba(255, 255, 255, 0.12)"
                              : "rgba(0, 0, 0, 0.12)",
                          borderRadius: 1,
                          width: 128,
                        }}
                      />
                    </Box>

                    <Stack spacing={1.5}>
                      {[...Array(3)].map((_, i) => (
                        <Paper
                          key={i}
                          sx={{
                            bgcolor:
                              i === 0
                                ? theme.palette.mode === "dark"
                                  ? "rgba(250, 255, 180, 0.1)"
                                  : "rgba(250, 255, 180, 0.3)"
                                : theme.palette.background.paper,
                            p: 1.5,
                            borderRadius: 2,
                          }}
                        >
                          <Box
                            sx={{
                              height: 8,
                              bgcolor:
                                theme.palette.mode === "dark"
                                  ? "rgba(34, 34, 59, 0.3)"
                                  : "rgba(34, 34, 59, 0.2)",
                              borderRadius: 1,
                              width: 96 + i * 16,
                              mb: 1,
                            }}
                          />
                          <Box
                            sx={{
                              height: 6,
                              bgcolor:
                                theme.palette.mode === "dark"
                                  ? "rgba(255, 255, 255, 0.12)"
                                  : "rgba(0, 0, 0, 0.12)",
                              borderRadius: 1,
                              width: 112 + i * 16,
                            }}
                          />
                        </Paper>
                      ))}
                    </Stack>
                  </Box>

                  {/* Bottom nav */}
                  <Box
                    sx={{
                      height: 64,
                      borderTop: 1,
                      borderColor:
                        theme.palette.mode === "dark"
                          ? "rgba(255, 255, 255, 0.12)"
                          : "rgba(0, 0, 0, 0.12)",
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                      px: 1,
                    }}
                  >
                    {[true, false, false, false].map((active, i) => (
                      <Box
                        key={i}
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: 0.5,
                        }}
                      >
                        <Box
                          sx={{
                            width: 20,
                            height: 20,
                            bgcolor: active
                              ? theme.palette.secondary.main
                              : theme.palette.mode === "dark"
                                ? "rgba(255, 255, 255, 0.3)"
                                : "rgba(0, 0, 0, 0.3)",
                            borderRadius: 0.5,
                          }}
                        />
                        {active && (
                          <Box
                            sx={{
                              height: 4,
                              bgcolor: theme.palette.primary.main,
                              borderRadius: 1,
                              width: 16,
                            }}
                          />
                        )}
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Paper>

              {/* Glow */}
              <Box
                sx={{
                  position: "absolute",
                  inset: -16,
                  background: `linear-gradient(to right, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
                  borderRadius: 6,
                  filter: "blur(40px)",
                  opacity: 0.2,
                  zIndex: -1,
                }}
              />
            </Box>

            {/* Features list */}
            <Box
              sx={{
                maxWidth: 460,
                textAlign: { xs: "center", md: "left" },
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  color: theme.palette.text.primary,
                  mb: 1,
                }}
              >
                Tudo que você precisa em um app
              </Typography>
              <Typography color="text.secondary" sx={{ mb: 3 }}>
                HelpHub oferece uma experiência completa e moderna para conectar
                você com oportunidades de impacto social.
              </Typography>

              <Stack spacing={2} sx={{ mb: 4 }}>
                {features.map((feature, i) => (
                  <Box
                    key={i}
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 2,
                      justifyContent: { xs: "center", md: "flex-start" },
                    }}
                  >
                    <Avatar
                      sx={{
                        bgcolor: theme.palette.secondary.main,
                        color: theme.palette.secondary.contrastText,
                        width: 40,
                        height: 40,
                      }}
                    >
                      <Check sx={{ fontWeight: "bold" }} />
                    </Avatar>
                    <Box>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: 600,
                          color: theme.palette.text.primary,
                        }}
                      >
                        {feature.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {feature.description}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Stack>

              <Button
                variant="contained"
                size="large"
                endIcon={<ArrowForward />}
                onClick={() => navigate("/sign-up")}
                sx={{
                  bgcolor: theme.palette.primary.main,
                  color: theme.palette.primary.contrastText,
                  px: 3,
                  py: 1.5,
                  borderRadius: 3,
                  fontWeight: 600,
                  "&:hover": {
                    bgcolor:
                      theme.palette.primary.dark || theme.palette.primary.main,
                    filter: "brightness(0.9)",
                  },
                }}
              >
                Começar Agora
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Benefits */}
      <Box
        sx={{
          py: { xs: 10, md: 14 },
          bgcolor: theme.palette.background.default,
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Typography
              variant={isMobile ? "h4" : "h3"}
              component="h2"
              sx={{ fontWeight: 700, color: theme.palette.text.primary, mb: 2 }}
            >
              Por que escolher o HelpHub?
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Benefícios que fazem a diferença
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {benefits.map((benefit, i) => (
              <Box
                key={i}
                sx={{
                  width: { xs: "100%", sm: "33.3333%" },
                  p: 2,
                  display: "flex",
                }}
              >
                <Card
                  elevation={0}
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    bgcolor: theme.palette.background.paper,
                    border: "1px solid",
                    borderColor:
                      theme.palette.mode === "dark"
                        ? "rgba(255, 255, 255, 0.12)"
                        : "rgba(0, 0, 0, 0.12)",
                    borderRadius: 3,
                    transition: "border-color 0.3s, transform 0.18s",
                    "&:hover": {
                      borderColor: theme.palette.secondary.main,
                      transform: "translateY(-4px)",
                    },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Avatar
                      sx={{
                        width: 48,
                        height: 48,
                        bgcolor:
                          theme.palette.mode === "dark"
                            ? "rgba(250, 255, 180, 0.15)"
                            : "rgba(250, 255, 180, 0.3)",
                        color: theme.palette.text.primary,
                        mb: 2,
                      }}
                    >
                      {benefit.icon}
                    </Avatar>
                    <Typography
                      variant="h6"
                      sx={{
                        color: theme.palette.text.primary,
                        fontWeight: 600,
                        mb: 1,
                      }}
                    >
                      {benefit.title}
                    </Typography>
                    <Typography color="text.secondary">
                      {benefit.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Final CTA */}
      <Box
        sx={{
          background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.primary.dark || theme.palette.primary.main})`,
          color: theme.palette.primary.contrastText,
          py: { xs: 10, md: 14 },
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: -40,
            right: -40,
            width: 384,
            height: 384,
            bgcolor: theme.palette.secondary.main,
            borderRadius: "50%",
            filter: "blur(60px)",
            opacity: 0.1,
            mixBlendMode: "multiply",
          }}
        />

        <Container
          maxWidth="lg"
          sx={{ position: "relative", textAlign: "center" }}
        >
          <Typography
            variant={isMobile ? "h4" : "h3"}
            sx={{ fontWeight: 700, mb: 3 }}
          >
            Pronto para Fazer a Diferença?
          </Typography>
          <Typography
            variant="h6"
            sx={{ maxWidth: 800, mx: "auto", opacity: 0.95, mb: 4 }}
          >
            Junte-se a milhares de pessoas e organizações que já estão criando
            impacto real através do HelpHub.
          </Typography>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{ justifyContent: "center", mb: 6 }}
          >
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowForward />}
              onClick={() => navigate("/sign-up")}
              sx={{
                bgcolor: theme.palette.secondary.main,
                color: theme.palette.secondary.contrastText,
                px: 4,
                py: 1.5,
                fontSize: { xs: "1rem", md: "1.125rem" },
                fontWeight: 600,
                borderRadius: 3,
                "&:hover": {
                  bgcolor:
                    theme.palette.secondary.dark ||
                    theme.palette.secondary.main,
                  filter: "brightness(0.9)",
                },
              }}
            >
              Começar Agora
            </Button>
            <Button
              variant="outlined"
              size="large"
              sx={{
                borderColor: theme.palette.primary.contrastText,
                color: theme.palette.primary.contrastText,
                px: 4,
                py: 1.5,
                fontSize: { xs: "1rem", md: "1.125rem" },
                fontWeight: 600,
                borderRadius: 3,
                borderWidth: 2,
                "&:hover": {
                  borderWidth: 2,
                  bgcolor: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              Saiba Mais
            </Button>
          </Stack>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={4}
            sx={{
              justifyContent: "center",
              alignItems: "center",
              opacity: 0.9,
              fontSize: "0.875rem",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Security />
              <span>100% Seguro e Confiável</span>
            </Box>
          </Stack>
        </Container>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          bgcolor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          py: { xs: 8, md: 10 },
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} sx={{ mb: 6 }}>
            <Grid item xs={12} md={3}>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                HelpHub
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Conectando ONGs e voluntários para um mundo melhor.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                Produto
              </Typography>
              <Stack spacing={1}>
                {["Para Voluntários", "Para ONGs", "Recursos"].map((item) => (
                  <Typography
                    key={item}
                    variant="body2"
                    component="a"
                    href="#"
                    sx={{
                      color: "inherit",
                      opacity: 0.8,
                      textDecoration: "none",
                      "&:hover": { color: theme.palette.secondary.main },
                    }}
                  >
                    {item}
                  </Typography>
                ))}
              </Stack>
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                Empresa
              </Typography>
              <Stack spacing={1}>
                {["Sobre Nós", "Blog", "Contato"].map((item) => (
                  <Typography
                    key={item}
                    variant="body2"
                    component="a"
                    href="#"
                    sx={{
                      color: "inherit",
                      opacity: 0.8,
                      textDecoration: "none",
                      "&:hover": { color: theme.palette.secondary.main },
                    }}
                  >
                    {item}
                  </Typography>
                ))}
              </Stack>
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                Legal
              </Typography>
              <Stack spacing={1}>
                {["Privacidade", "Termos", "Cookies"].map((item) => (
                  <Typography
                    key={item}
                    variant="body2"
                    component="a"
                    href="#"
                    sx={{
                      color: "inherit",
                      opacity: 0.8,
                      textDecoration: "none",
                      "&:hover": { color: theme.palette.secondary.main },
                    }}
                  >
                    {item}
                  </Typography>
                ))}
              </Stack>
            </Grid>
          </Grid>

          <Box sx={{ borderTop: "1px solid rgba(255, 255, 255, 0.2)", pt: 4 }}>
            <Typography
              variant="body2"
              sx={{ textAlign: "center", opacity: 0.8 }}
            >
              © 2025 HelpHub. Todos os direitos reservados. Construído com ❤️
              para conectar pessoas que fazem diferença.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
