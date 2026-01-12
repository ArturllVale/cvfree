# CVFree 📄

> **Gerador de Currículos Profissionais Gratuito** — Crie, visualize e exporte seu currículo em tempo real.

[![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.3-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

---

## ✨ Funcionalidades

### 📝 Editor Completo de Currículos
- **Dados Pessoais** — Nome, email, telefone, cidade, estado, LinkedIn, portfolio e foto
- **Objetivo Profissional** — Campo de texto livre para sua meta de carreira
- **Experiências** — Histórico profissional com empresa, cargo, descrição e datas
- **Formação Acadêmica** — Ensino médio, técnico, graduação, pós-graduação, mestrado, doutorado
- **Habilidades** — Skills com níveis (Básico, Intermediário, Avançado)

### 🎨 Templates Profissionais
| Modelo | Descrição |
|--------|-----------|
| **Clássico** | Layout tradicional, limpo e formal — ideal para áreas corporativas |
| **Moderno** | Design contemporâneo com sidebar colorida — perfeito para criativos |

### 🔄 Visualização em Tempo Real
- Preview instantâneo enquanto você edita
- Layout responsivo desktop/mobile com alternância de abas

### 💾 Persistência de Dados
- **Auto-save** automático via `localStorage`
- **Exportar/Importar JSON** — Backup completo do seu currículo
- **Exportar PDF** — Geração via janela de impressão do navegador

### 🌓 Tema Claro/Escuro
- Alternância entre temas com detecção automática de preferência do sistema
- Persistência da escolha do usuário

---

## 🚀 Quick Start

### Pré-requisitos
- Node.js 18+
- npm, pnpm, yarn ou bun

### Instalação

```bash
# Clone o repositório
git clone https://github.com/ArturllVale/cvfree.git
cd cvfree

# Instale as dependências
npm install
# ou
pnpm install

# Inicie o servidor de desenvolvimento
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador.

---

## 📁 Estrutura do Projeto

```
cvfree/
├── src/
│   ├── app/                    # App Router (Next.js 16)
│   │   ├── page.tsx            # Página principal
│   │   ├── layout.tsx          # Layout root
│   │   └── globals.css         # Estilos globais + Tailwind
│   │
│   ├── components/
│   │   ├── editor/             # Formulários de edição
│   │   │   ├── DadosPessoaisSection.tsx
│   │   │   ├── ObjetivoSection.tsx
│   │   │   ├── ExperienciaSection.tsx
│   │   │   ├── FormacaoSection.tsx
│   │   │   ├── HabilidadesSection.tsx
│   │   │   └── ModelSelector.tsx
│   │   │
│   │   ├── preview/            # Templates de visualização
│   │   │   ├── ResumePreview.tsx
│   │   │   ├── ClassicResume.tsx
│   │   │   └── ModernResume.tsx
│   │   │
│   │   ├── export/             # Exportação PDF/Impressão
│   │   │   └── ExportPanel.tsx
│   │   │
│   │   ├── layout/             # Componentes de layout
│   │   │   └── Navbar.tsx
│   │   │
│   │   └── ui/                 # Componentes UI reutilizáveis
│   │
│   ├── context/                # React Context API
│   │   ├── ResumeContext.tsx   # Estado global do currículo
│   │   └── ThemeContext.tsx    # Tema claro/escuro
│   │
│   ├── types/                  # TypeScript types
│   │   └── resume.ts           # Interfaces do currículo
│   │
│   ├── lib/                    # Utilitários
│   │   └── utils.ts
│   │
│   └── utils/
│
├── public/                     # Assets estáticos
├── package.json
├── tsconfig.json
├── next.config.ts
├── postcss.config.mjs
└── eslint.config.mjs
```

---

## 🛠️ Stack Tecnológica

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| **Next.js** | 16.1.1 | Framework React com App Router |
| **React** | 19.2.3 | Biblioteca UI |
| **TypeScript** | 5.x | Tipagem estática |
| **Tailwind CSS** | 4.x | Estilização utility-first |
| **Lucide React** | 0.562.0 | Ícones |
| **html2pdf.js** | 0.13.0 | Conversão para PDF |
| **clsx** + **tailwind-merge** | - | Utilitários de classes |

---

## 📦 Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run start` | Inicia servidor de produção |
| `npm run lint` | Executa ESLint |

---

## 🔧 Configuração

### Variáveis de Ambiente
Este projeto não requer variáveis de ambiente obrigatórias.

### Personalização de Tema
Os tokens de design estão em `src/app/globals.css`:
```css
:root {
  --primary: ...;
  --accent: ...;
  --background: ...;
  /* ... */
}

[data-theme="dark"] {
  /* Dark mode overrides */
}
```

---

## 📱 Responsividade

| Breakpoint | Layout |
|------------|--------|
| **Mobile** (`< 1024px`) | Abas Editor/Preview |
| **Desktop** (`≥ 1024px`) | Side-by-side columns |

---

## 🤝 Contribuindo

1. Fork o repositório
2. Crie sua branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'feat: adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto é [MIT](LICENSE) licenciado.

---

## 👤 Autor

**Artur Vale**
- GitHub: [@ArturllVale](https://github.com/ArturllVale)

---

<p align="center">
  <strong>⭐ Se este projeto te ajudou, deixe uma estrela!</strong>
</p>
