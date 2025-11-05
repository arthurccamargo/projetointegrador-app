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
  useMediaQuery
} from '@mui/material';
import {
  Favorite,
  People,
  TrackChanges,
  ArrowForward,
  FlashOn,
  Security,
  Public,
  Check,
  BatteryFull
} from '@mui/icons-material';

export default function StartPageWeb() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
      description: "Encontre todas as oportunidades de voluntariado em um único lugar, organizado e fácil de filtrar."
    },
    {
      icon: <Security sx={{ fontSize: 32 }} />,
      title: "Avaliações Confiáveis",
      description: "Avaliações verificadas de voluntários e ONGs criam um ambiente de confiança e segurança."
    },
    {
      icon: <FlashOn sx={{ fontSize: 32 }} />,
      title: "Comunicação Facilitada",
      description: "Chat integrado e notificações mantêm voluntários e ONGs sempre conectados e informados."
    },
    {
      icon: <Favorite sx={{ fontSize: 32 }} />,
      title: "Impacto Mensurável",
      description: "Acompanhe e visualize o impacto real que suas ações e doações geram nas comunidades."
    },
    {
      icon: <People sx={{ fontSize: 32 }} />,
      title: "Comunidade Engajada",
      description: "Conecte-se com pessoas que compartilham seus valores e causas que você apoiar."
    },
    {
      icon: <TrackChanges sx={{ fontSize: 32 }} />,
      title: "Fácil de Usar",
      description: "Interface intuitiva e mobile-first que funciona perfeitamente em qualquer dispositivo."
    },
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'white' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 50%, #0d47a1 100%)',
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
          py: { xs: 10, md: 14 }
        }}
      >
        {/* Decorative background */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            opacity: 0.1,
            '&::before, &::after': {
              content: '""',
              position: 'absolute',
              width: 288,
              height: 288,
              bgcolor: '#ff9800',
              borderRadius: '50%',
              filter: 'blur(60px)',
              mixBlendMode: 'multiply'
            },
            '&::before': {
              top: 40,
              right: 40
            },
            '&::after': {
              bottom: -32,
              left: 40
            }
          }}
        />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <Box sx={{ maxWidth: 900 }}>
              <Typography
                variant={isMobile ? 'h3' : 'h2'}
                component="h1"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  lineHeight: 1.2
                }}
              >
                Conecte-se a causas reais.
                <Box component="span" sx={{ display: 'block', color: '#ff9800', mt: 1 }}>
                  Faça a diferença
                </Box>
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.95, maxWidth: 800, mx: 'auto' }}>
                Uma plataforma que une ONGs e voluntários em um só lugar. Transforme sua vontade de ajudar em ações
                concretas.
              </Typography>
            </Box>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ pt: 2, width: { xs: '100%', sm: 'auto' } }}>
              <Button
                variant="contained"
                size="large"
                endIcon={<ArrowForward />}
                sx={{
                  bgcolor: '#ff9800',
                  color: 'white',
                  px: 4,
                  py: 1.5,
                  fontSize: { xs: '1rem', md: '1.125rem' },
                  fontWeight: 600,
                  borderRadius: 3,
                  boxShadow: 3,
                  '&:hover': {
                    bgcolor: '#f57c00'
                  }
                }}
              >
                Quero Ajudar
              </Button>
              <Button
                variant="outlined"
                size="large"
                sx={{
                  borderColor: 'white',
                  color: 'white',
                  px: 4,
                  py: 1.5,
                  fontSize: { xs: '1rem', md: '1.125rem' },
                  fontWeight: 600,
                  borderRadius: 3,
                  borderWidth: 2,
                  '&:hover': {
                    borderWidth: 2,
                    bgcolor: 'rgba(255, 255, 255, 0.1)'
                  }
                }}
              >
                Sou uma ONG
              </Button>
            </Stack>
          </Box>
        </Container>
      </Box>

      {/* Hero Image */}
      <Box sx={{ py: { xs: 6, md: 8 }, bgcolor: 'white' }}>
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

      {/* How it Works */}
      <Box sx={{ py: { xs: 10, md: 14 }, bgcolor: 'white' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant={isMobile ? 'h4' : 'h3'} component="h2" sx={{ fontWeight: 700, color: '#1976d2', mb: 2 }}>
              Como o HelpHub Funciona
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Três passos simples para começar a fazer diferença
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {[
              {
                step: 1,
                title: "ONGs Cadastram Ações",
                description: "Organizações publicam suas oportunidades de voluntariado, detalham as necessidades e compartilham seu propósito social."
              },
              {
                step: 2,
                title: "Voluntários se Candidatam",
                description: "Pessoas interessadas em ajudar encontram oportunidades que combinam com seus interesses e disponibilidade."
              },
              {
                step: 3,
                title: "Ajudas Acontecem",
                description: "Conexões são feitas, voluntários e ONGs colaboram, e o impacto social real começa a acontecer."
              }
            ].map((item) => (
              <Grid item xs={12} md={4} key={item.step}>
                <Card
                  elevation={0}
                  sx={{
                    height: '100%',
                    border: '2px solid',
                    borderColor: 'grey.200',
                    borderRadius: 4,
                    transition: 'all 0.3s',
                    '&:hover': {
                      boxShadow: 6,
                      borderColor: '#ff9800'
                    }
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Avatar
                      sx={{
                        width: 64,
                        height: 64,
                        bgcolor: '#1976d2',
                        color: '#ff9800',
                        fontSize: '1.5rem',
                        fontWeight: 700,
                        mb: 2
                      }}
                    >
                      {item.step}
                    </Avatar>
                    <Typography variant="h6" sx={{ color: '#1976d2', fontWeight: 600, mb: 1 }}>
                      {item.title}
                    </Typography>
                    <Typography color="text.secondary">
                      {item.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* App Showcase */}
      <Box
        sx={{
          py: { xs: 10, md: 14 },
          background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.05) 0%, white 50%, rgba(255, 152, 0, 0.05) 100%)'
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant={isMobile ? 'h4' : 'h3'} component="h2" sx={{ fontWeight: 700, color: '#1976d2', mb: 2 }}>
              Uma Plataforma Moderna e Intuitiva
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Design mobile-first pensado para você. Simples, rápido e eficiente.
            </Typography>
          </Box>

          <Grid container spacing={6} alignItems="center">
            {/* Phone Mockup */}
            <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-end' } }}>
              <Box sx={{ position: 'relative', width: 320 }}>
                <Paper
                  elevation={8}
                  sx={{
                    bgcolor: 'black',
                    borderRadius: 6,
                    p: 1.5,
                    position: 'relative',
                    aspectRatio: '9/19.5'
                  }}
                >
                  <Box sx={{ bgcolor: 'white', borderRadius: 4, height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                    {/* Phone header */}
                    <Box sx={{ bgcolor: '#1976d2', height: 32, display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, color: 'white', fontSize: '0.75rem' }}>
                      <span>9:41</span>
                      <BatteryFull sx={{ fontSize: 16 }} />
                    </Box>
                    {/* App content */}
                    <Box sx={{ flex: 1, p: 2, bgcolor: 'white', overflow: 'auto' }}>
                      <Box sx={{ mb: 2 }}>
                        <Box sx={{ height: 12, bgcolor: '#1976d2', borderRadius: 1, width: 96, mb: 1 }} />
                        <Box sx={{ height: 8, bgcolor: 'grey.200', borderRadius: 1, width: 128 }} />
                      </Box>
                      <Stack spacing={1.5}>
                        <Paper sx={{ bgcolor: 'rgba(255, 152, 0, 0.2)', p: 1.5, borderRadius: 2 }}>
                          <Box sx={{ height: 8, bgcolor: 'rgba(25, 118, 210, 0.3)', borderRadius: 1, width: 80, mb: 1 }} />
                          <Box sx={{ height: 6, bgcolor: 'grey.200', borderRadius: 1, width: 96 }} />
                        </Paper>
                        <Paper sx={{ bgcolor: 'grey.100', p: 1.5, borderRadius: 2 }}>
                          <Box sx={{ height: 8, bgcolor: 'rgba(25, 118, 210, 0.3)', borderRadius: 1, width: 112, mb: 1 }} />
                          <Box sx={{ height: 6, bgcolor: 'grey.200', borderRadius: 1, width: 128 }} />
                        </Paper>
                        <Paper sx={{ bgcolor: 'grey.100', p: 1.5, borderRadius: 2 }}>
                          <Box sx={{ height: 8, bgcolor: 'rgba(25, 118, 210, 0.3)', borderRadius: 1, width: 96, mb: 1 }} />
                          <Box sx={{ height: 6, bgcolor: 'grey.200', borderRadius: 1, width: 112 }} />
                        </Paper>
                      </Stack>
                    </Box>
                    {/* Bottom nav */}
                    <Box sx={{ height: 64, borderTop: 1, borderColor: 'grey.200', display: 'flex', justifyContent: 'space-around', alignItems: 'center', px: 1 }}>
                      {[true, false, false, false].map((active, i) => (
                        <Box key={i} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
                          <Box sx={{ width: 20, height: 20, bgcolor: active ? '#ff9800' : 'grey.300', borderRadius: 0.5 }} />
                          {active && <Box sx={{ height: 4, bgcolor: '#1976d2', borderRadius: 1, width: 16 }} />}
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </Paper>
                <Box
                  sx={{
                    position: 'absolute',
                    inset: -16,
                    background: 'linear-gradient(to right, #ff9800, rgba(25, 118, 210, 0.3))',
                    borderRadius: 6,
                    filter: 'blur(40px)',
                    opacity: 0.2,
                    zIndex: -1
                  }}
                />
              </Box>
            </Grid>

            {/* Features List */}
            <Grid item xs={12} md={6}>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#1976d2', mb: 1 }}>
                  Tudo que você precisa em um app
                </Typography>
                <Typography color="text.secondary" sx={{ mb: 3 }}>
                  HelpHub oferece uma experiência completa e moderna para conectar você com oportunidades de impacto social.
                </Typography>

                <Stack spacing={2} sx={{ mb: 4 }}>
                  {features.map((feature, i) => (
                    <Box key={i} sx={{ display: 'flex', gap: 2 }}>
                      <Avatar sx={{ bgcolor: '#ff9800', color: '#1976d2', width: 40, height: 40 }}>
                        <Check sx={{ fontWeight: 'bold' }} />
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#1976d2' }}>
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
                  sx={{
                    bgcolor: '#1976d2',
                    px: 3,
                    py: 1.5,
                    borderRadius: 3,
                    fontWeight: 600,
                    '&:hover': {
                      bgcolor: '#1565c0'
                    }
                  }}
                >
                  Começar Agora
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Benefits */}
      <Box sx={{ py: { xs: 10, md: 14 }, bgcolor: 'grey.50' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant={isMobile ? 'h4' : 'h3'} component="h2" sx={{ fontWeight: 700, color: '#1976d2', mb: 2 }}>
              Por que escolher o HelpHub?
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Benefícios que fazem a diferença
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {benefits.map((benefit, i) => (
              <Grid item xs={12} sm={6} lg={4} key={i}>
                <Card
                  elevation={0}
                  sx={{
                    height: '100%',
                    border: '1px solid',
                    borderColor: 'grey.300',
                    borderRadius: 3,
                    transition: 'border-color 0.3s',
                    '&:hover': {
                      borderColor: '#ff9800'
                    }
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Avatar
                      sx={{
                        width: 48,
                        height: 48,
                        bgcolor: 'rgba(255, 152, 0, 0.2)',
                        color: '#1976d2',
                        mb: 2
                      }}
                    >
                      {benefit.icon}
                    </Avatar>
                    <Typography variant="h6" sx={{ color: '#1976d2', fontWeight: 600, mb: 1 }}>
                      {benefit.title}
                    </Typography>
                    <Typography color="text.secondary">
                      {benefit.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Final CTA */}
      <Box
        sx={{
          background: 'linear-gradient(to right, #1976d2, #1565c0)',
          color: 'white',
          py: { xs: 10, md: 14 },
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: -40,
            right: -40,
            width: 384,
            height: 384,
            bgcolor: '#ff9800',
            borderRadius: '50%',
            filter: 'blur(60px)',
            opacity: 0.1,
            mixBlendMode: 'multiply'
          }}
        />

        <Container maxWidth="lg" sx={{ position: 'relative', textAlign: 'center' }}>
          <Typography variant={isMobile ? 'h4' : 'h3'} sx={{ fontWeight: 700, mb: 3 }}>
            Pronto para Fazer a Diferença?
          </Typography>
          <Typography variant="h6" sx={{ maxWidth: 800, mx: 'auto', opacity: 0.95, mb: 4 }}>
            Junte-se a milhares de pessoas e organizações que já estão criando impacto real através do HelpHub.
          </Typography>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ justifyContent: 'center', mb: 6 }}>
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowForward />}
              sx={{
                bgcolor: '#ff9800',
                color: 'white',
                px: 4,
                py: 1.5,
                fontSize: { xs: '1rem', md: '1.125rem' },
                fontWeight: 600,
                borderRadius: 3,
                '&:hover': {
                  bgcolor: '#f57c00'
                }
              }}
            >
              Começar Agora
            </Button>
            <Button
              variant="outlined"
              size="large"
              sx={{
                borderColor: 'white',
                color: 'white',
                px: 4,
                py: 1.5,
                fontSize: { xs: '1rem', md: '1.125rem' },
                fontWeight: 600,
                borderRadius: 3,
                borderWidth: 2,
                '&:hover': {
                  borderWidth: 2,
                  bgcolor: 'rgba(255, 255, 255, 0.1)'
                }
              }}
            >
              Saiba Mais
            </Button>
          </Stack>

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={4}
            sx={{ justifyContent: 'center', alignItems: 'center', opacity: 0.9, fontSize: '0.875rem' }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Security />
              <span>100% Seguro e Confiável</span>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <People />
              <span>+10k Voluntários Ativos</span>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <TrackChanges />
              <span>+500 ONGs Parceiras</span>
            </Box>
          </Stack>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ bgcolor: '#1976d2', color: 'white', py: { xs: 8, md: 10 } }}>
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
                {['Para Voluntários', 'Para ONGs', 'Recursos'].map((item) => (
                  <Typography
                    key={item}
                    variant="body2"
                    component="a"
                    href="#"
                    sx={{
                      color: 'inherit',
                      opacity: 0.8,
                      textDecoration: 'none',
                      '&:hover': { color: '#ff9800' }
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
                {['Sobre Nós', 'Blog', 'Contato'].map((item) => (
                  <Typography
                    key={item}
                    variant="body2"
                    component="a"
                    href="#"
                    sx={{
                      color: 'inherit',
                      opacity: 0.8,
                      textDecoration: 'none',
                      '&:hover': { color: '#ff9800' }
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
                {['Privacidade', 'Termos', 'Cookies'].map((item) => (
                  <Typography
                    key={item}
                    variant="body2"
                    component="a"
                    href="#"
                    sx={{
                      color: 'inherit',
                      opacity: 0.8,
                      textDecoration: 'none',
                      '&:hover': { color: '#ff9800' }
                    }}
                  >
                    {item}
                  </Typography>
                ))}
              </Stack>
            </Grid>
          </Grid>

          <Box sx={{ borderTop: '1px solid rgba(255, 255, 255, 0.2)', pt: 4 }}>
            <Typography variant="body2" sx={{ textAlign: 'center', opacity: 0.8 }}>
              © 2025 HelpHub. Todos os direitos reservados. Construído com ❤️ para conectar pessoas que fazem diferença.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}