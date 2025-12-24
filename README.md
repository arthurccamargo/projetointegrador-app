# HelpHub - Frontend

<div align="center">

![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Material-UI](https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white)
![Redux](https://img.shields.io/badge/Redux_Toolkit-593D88?style=for-the-badge&logo=redux&logoColor=white)

**Aplicação multiplataforma (Web + Mobile) para gestão de voluntariado em crises humanitárias**

[🔗 Backend Repository](https://github.com/arthurccamargo/projetointegrador-api) • [🔗 Admin Frontend Repository](https://github.com/arthurccamargo/projetointegrador-admin-app)

</div>

---

## Sobre o Projeto

Frontend da plataforma **HelpHub**, desenvolvida para otimizar a conexão entre voluntários e ONGs durante emergências. Nascido da experiência das enchentes no Rio Grande do Sul, resolve o problema crítico da descentralização de informações em crises.

**Solução:** Plataforma centralizada, intuitiva e segura que funciona tanto na web quanto em dispositivos móveis.

---

## Features Principais

### 🔐 Sistema de Autenticação Completo
- Login/registro com validação em tempo real
- 3 tipos de perfil: Voluntário, ONG e Admin
- Proteção de rotas baseada em permissões
- Token JWT com renovação automática

### 📅 Gestão de Eventos
**Para Voluntários:**
- Feed inteligente que oculta eventos já inscritos
- Filtros por categoria, data e localização
- Candidatura com um clique
- Histórico completo de participações

**Para ONGs:**
- Criação e edição de eventos
- Histórico dos eventos com a lista de candidaturas
- Aprovação/rejeição de voluntários
- Estatísticas em tempo real

### ✓ Check-in Presencial Inovador
Sistema exclusivo para garantir presença real dos voluntários:
- ONG recebe código único de 6 dígitos ao começar o evento
- Voluntário faz check-in com esse código no app
- Validação em tempo real com feedback visual
- **Apenas quem fez check-in pode avaliar a ONG**

### ⭐ Avaliações Verificadas
- Sistema de 1 a 5 estrelas + comentário opcional
- **Regra de negócio:** Só pode avaliar quem compareceu
- Prazo de 48h após check-in
- Média calculada automaticamente no perfil da ONG

### 📱 Multiplataforma
- **Web:** Interface responsiva completa
- **Mobile:** App nativo iOS/Android via Capacitor

---

## 🛠️ Stack Tecnológica

| Tecnologia | Uso |
|-----------|-----|
| **React 19** | Biblioteca UI com hooks modernos |
| **TypeScript** | Type-safety em todo o código |
| **Material-UI (MUI)** | Design system profissional |
| **Redux Toolkit** | State management otimizado |
| **RTK Query** | Cache e sincronização com API |
| **React Router v7** | Navegação SPA |
| **React Hook Form + Zod** | Formulários com validação |
| **TanStack Query** | Server state management |
| **Vite** | Build tool ultrarrápida |
| **Capacitor** | Runtime cross-platform |

---

## 📸 Capturas de Tela

### Tela de Login (Visão da ONG e do Voluntário)
*Situação em que o ADMIN bloqueou a ONG no Portal do ADMIN: [🔗 Admin Frontend Repository](https://github.com/arthurccamargo/projetointegrador-admin-app)*
<img width="773" height="686" alt="Captura de tela 2025-12-24 171922" src="https://github.com/user-attachments/assets/3bcb05cc-70b8-40d0-9496-965922143cd2" />

### Tela Inicial da ONG (Visão da ONG)
<img width="1027" height="584" alt="Captura de tela 2025-12-24 172951" src="https://github.com/user-attachments/assets/26fd17c5-380e-48fb-879a-6972eded282b" />

### Lista de Candidatos ao Evento (Visão da ONG)
*ONG pode ver o perfil dos cadidatos(voluntários) de um evento e rejeitar esse canditado*
<img width="1204" height="678" alt="Captura de tela 2025-12-24 174641" src="https://github.com/user-attachments/assets/2724a883-7236-4323-abfd-d8a3872e520a" />

### Histórico de eventos da ONG (Visão da ONG)
<img width="1893" height="903" alt="Captura de tela 2025-11-28 035122" src="https://github.com/user-attachments/assets/93feecda-e004-4e4a-b13b-dc2b66b1e7ed" />

### Evento começa e ONG recebe um código único de 6 dígitos (Visão da ONG)
<img width="1915" height="905" alt="Captura de tela 2025-11-28 021630" src="https://github.com/user-attachments/assets/3f6e6532-ba54-4e40-be06-7c1450066b5a" />

### Tela Inicial do Voluntário (Visão do Voluntário)
<img width="1218" height="688" alt="image" src="https://github.com/user-attachments/assets/23ad10a7-1e74-4bca-95e1-a3fe466c41d9" />

### Validação de presença do voluntário (Visão do Voluntário)
*Voluntário faz check-in com código que recebeu da ONG presencialmente*
<img width="1917" height="907" alt="Captura de tela 2025-11-28 021903" src="https://github.com/user-attachments/assets/d4ed69e7-e912-49d9-b2d2-d0ca816908e7" />
<img width="1917" height="904" alt="Captura de tela 2025-11-28 022013" src="https://github.com/user-attachments/assets/99fb2432-0024-4150-a9d8-30a2e79c88ed" />

### Avaliação feita pelo Voluntário (Visão do Voluntário)
*Transparência: avaliações verificadas apenas de quem compareceu*
<img width="1895" height="903" alt="Captura de tela 2025-11-28 022310" src="https://github.com/user-attachments/assets/dcc2f992-4df8-4cbc-b878-1969ea50b520" />

### 📱 Telas Mobile
Modo escuro ativado na terceira tela mobile
<div align="center">
  <img width="30%" alt="Mobile screen 1" src="https://github.com/user-attachments/assets/d4ca4015-5462-451d-ac32-3364d66f004f" />
  <img width="30%" alt="Mobile screen 2" src="https://github.com/user-attachments/assets/abfbbbcc-da6a-4eed-8321-55dc54ca46c2" />
  <img width="30%" alt="Mobile screen 3" src="https://github.com/user-attachments/assets/4fd73bdb-cfbb-47b5-840b-56dbc143caf0" />
</div>



---

<div align="center">

**Desenvolvido como Projeto Integrador - UFRGS (2025/2)**

</div>
