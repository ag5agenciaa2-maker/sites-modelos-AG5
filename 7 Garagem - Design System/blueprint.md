# 7 Garage - Blueprint Técnico

> Documentação técnica completa da Landing Page 7 Garage Estética Automotiva  
> Gerado em: 11/03/2026  
> Versão: 1.0

---

## 1. Global Design System

### 1.1 Color Palette

#### Cores Primárias (Brand)
| Nome | HEX | Uso |
|------|-----|-----|
| Brand Red | `#dc2626` | CTAs, destaques, ícones ativos |
| Red Dark | `#991b1b` | Hover states, gradientes |
| Red Light | `#ef4444` | Acentos sutis |
| Gradient Brand | `linear-gradient(135deg, #dc2626 0%, #991b1b 100%)` | Textos gradiente, hero |

#### Cores Neutras (Industrial Dark)
| Nome | HEX | Uso |
|------|-----|-----|
| Zinc 950 | `#09090b` | Background principal |
| Zinc 900 | `#18181b` | Cards, surfaces |
| Zinc 800 | `#27272a` | Bordas, divisores |
| Zinc 700 | `#3f3f46` | Bordas hover, elementos inativos |
| Zinc 500 | `#71717a` | Texto secundário |
| Zinc 400 | `#a1a1aa` | Texto terciário |
| Zinc 300 | `#d4d4d8` | Texto body |
| Zinc 100 | `#f4f4f5` | Texto primário |

#### Cores de Suporte
| Nome | HEX | Uso |
|------|-----|-----|
| WhatsApp Green | `#22c55e` | Botão flutuante WhatsApp |
| Yellow 500 | `#eab308` | Estrelas de avaliação |

### 1.2 Typography

#### Font Family
- **Primary:** `Inter, sans-serif` (Google Fonts)
- **Weights utilizados:** 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold), 800 (Extrabold), 900 (Black)

#### Escala Tipográfica
| Estilo | Tamanho | Line-Height | Weight | Letter-Spacing | Uso |
|--------|---------|-------------|--------|----------------|-----|
| Heading 1 | 80px-144px (responsive) | 1.0 | 900 (Black) | -0.05em (tracking-tighter) | Títulos hero |
| Heading 2 | 40px-60px | 1.0 | 900 (Black) | -0.05em + italic | Subtítulos de seção |
| Heading 3 | 24px-30px | 1.2 | 900 (Black) | -0.025em | Títulos de cards |
| Bold L | 20px | 1.4 | 800 (Extrabold) | 0.1em (tracking-widest) uppercase | Labels, badges |
| Bold M | 16px | 1.4 | 700 (Bold) | 0.05em uppercase | Navegação |
| Body Large | 18px | 1.6 | 500 (Medium) | normal | Descrições |
| Body | 16px | 1.6 | 400 (Regular) | normal | Texto geral |
| Caption | 12px | 1.4 | 800 (Extrabold) | 0.3em uppercase | Labels técnicos |
| Small | 10px | 1.4 | 700 (Bold) | 0.2em uppercase | Metadados |

### 1.3 Universal Styles

#### Border Radius
- **Botões:** `rounded-lg` (8px)
- **Cards:** `rounded-2xl` (16px) / `rounded-3xl` (24px)
- **Badges/Pills:** `rounded-full`
- **Logo container:** `rounded-lg` (8px)

#### Sombras
```css
/* Sombra padrão de botões */
shadow-lg shadow-red-900/20

/* Sombra de cards */
shadow-2xl

/* Sombra flutuante WhatsApp */
shadow-2xl (botão flutuante)
```

#### Efeitos Especiais
```css
/* Glassmorphism */
backdrop-blur-md + bg-zinc-950/95 + border-b border-zinc-900

/* Gradient Overlay Hero */
bg-gradient-to-b from-zinc-950/80 via-zinc-950/40 to-zinc-950

/* Text Gradient */
background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;

/* Industrial Light Effect */
absolute w-1 h-full bg-red-600/5 blur-3xl
```

---

## 2. Animation & Interaction Library

### 2.1 Entrance Animations

#### Hero Fade In Up
**Nome:** Hero Entrance  
**Localização:** Container do texto no Hero  
**Trigger:** On load (useEffect)  
**Duração:** 1000ms  
**Easing:** ease-out

```css
/* Estado inicial */
transform: translateY(40px);
opacity: 0;

/* Estado final */
transform: translateY(0);
opacity: 1;
transition: all 1000ms ease-out;
```

#### Scroll Indicator Bounce
**Nome:** Scroll Bounce  
**Localização:** Indicador de scroll no Hero  
**Trigger:** CSS infinite animation  
**Duração:** 2000ms

```css
animation: bounce 2s infinite;

/* Tailwind: animate-bounce */
```

### 2.2 Hover Animations

#### Button Scale
**Nome:** Button Hover Scale  
**Localização:** Todos os botões CTA  
**Trigger:** :hover  
**Duração:** 300ms

```css
transition: all 300ms;
transform: scale(1.05);
```

#### Card Lift
**Nome:** Card Hover Lift  
**Localização:** Cards de serviço  
**Trigger:** :hover  
**Duração:** 500ms

```css
transition: all 500ms;
transform: translateY(-8px);
border-color: rgba(220, 38, 38, 0.5); /* red-700/50 */
```

#### Image Zoom
**Nome:** Image Hover Zoom  
**Localização:** Imagens em cards, galeria  
**Trigger:** :hover  
**Duração:** 700ms

```css
transition: transform 700ms;
transform: scale(1.1);
```

#### Icon Background Transition
**Nome:** Icon BG Transition  
**Localização:** Ícones em cards de serviço  
**Trigger:** :hover no card pai (group-hover)  
**Duração:** 300ms

```css
/* Default */
background-color: rgba(220, 38, 38, 0.1); /* red-700/10 */
color: #dc2626;

/* Hover */
background-color: #dc2626;
color: #ffffff;
```

#### Grayscale Toggle
**Nome:** Grayscale Reveal  
**Localização:** Imagem na seção "Por que a 7 Garage?"  
**Trigger:** :hover  
**Duração:** 700ms

```css
/* Default */
filter: grayscale(100%);

/* Hover */
filter: grayscale(0%);
transition: all 700ms;
```

### 2.3 Navbar Scroll Behavior

**Nome:** Navbar Glass Effect  
**Localização:** Navbar fixa  
**Trigger:** window.scrollY > 50  
**Duração:** 300ms

```css
/* Estado inicial (topo) */
background: transparent;
padding: 1rem 1.5rem;

/* Estado scrolled */
background: rgba(9, 9, 11, 0.95); /* zinc-950/95 */
backdrop-filter: blur(12px);
border-bottom: 1px solid #18181b;
box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3);
transition: all 300ms;
```

### 2.4 Floating WhatsApp Button

**Nome:** WhatsApp Float  
**Localização:** Botão fixo inferior direito  
**Trigger:** CSS infinite  
**Duração:** 1000ms

```css
animation: bounce 1s infinite;
position: fixed;
bottom: 1.5rem;
right: 1.5rem;
z-index: 50;
```

---

## 3. Step-by-Step Layout Architecture

### 3.1 Navigation

**Estrutura:**
- Position: `fixed top-0 left-0 w-full z-[100]`
- Container: `max-w-6xl mx-auto`
- Layout: `flex justify-between items-center`
- Altura: ~72px (py-4 + conteúdo)

**Comportamento:**
- Transparente no topo
- Glass effect ao scrollar
- Logo à esquerda
- Links de navegação + CTA à direita (desktop)
- Menu hamburger (mobile)

### 3.2 Hero Section

**Estrutura:**
- Altura: `h-screen` (100vh)
- Layout: `flex items-center justify-center`
- Container de texto: `text-center`

**Camadas (z-index):**
1. z-0: Background image + gradient overlay + light effects
2. z-10: Conteúdo central (texto + CTAs)

**Elementos:**
- Badge "O Melhor Detalhamento de Araruama"
- H1: "SEU CARRO É UMA CONQUISTA." (com gradiente na segunda linha)
- Parágrafo descritivo
- 2 CTAs: Primário (WhatsApp) + Secundário (Ver Serviços)
- Scroll indicator (linha animada)

**Background:**
- Imagem Unsplash com opacity 50%
- Gradient overlay: `from-zinc-950/80 via-zinc-950/40 to-zinc-950`
- Industrial lights: 2 barras verticais com blur-3xl

### 3.3 Sobre Section (Dor + Aspiração)

**Estrutura:**
- Layout: `grid md:grid-cols-2 gap-16 items-center`
- Padding: `py-16 md:py-24`

**Coluna Esquerda:**
- H2: "Capricho ou frescura?"
- 3 parágrafos de texto
- Destaque com border-left vermelha

**Coluna Direita:**
- Grid de imagens 2x2 com offset vertical
- Imagens com `rounded-xl shadow-2xl border border-zinc-800`

### 3.4 Serviços Section

**Estrutura:**
- Header centralizado (título + descrição)
- Grid: `grid md:grid-cols-2 lg:grid-cols-4 gap-8`

**Card de Serviço:**
```
┌─────────────────────────────┐
│  [Imagem com overlay        │
│   gradiente]                │
├─────────────────────────────┤
│  [Ícone]                    │
│  Título do Serviço          │
│  Descrição breve...         │
└─────────────────────────────┘
```

**Especs do Card:**
- Background: `bg-zinc-900/50`
- Border: `border border-zinc-800` → `hover:border-red-700/50`
- Border-radius: `rounded-2xl`
- Hover: `hover:-translate-y-2` (lift effect)
- Imagem: `h-56 overflow-hidden` com zoom no hover

### 3.5 Diferenciais Section

**Estrutura:**
- Background: `bg-zinc-950` com border-y
- Texto decorativo gigante rotacionado no fundo (opacity 5%)
- Layout: `grid md:grid-cols-2 gap-20 items-center`

**Coluna Esquerda (Imagem):**
- Imagem principal com grayscale hover
- Card flutuante absoluto (stats: "5.000+ Avaliações")

**Coluna Direita (Lista):**
- H2: "Por que a 7 Garage?"
- Lista de 4 itens numerados (01-04)
- Cada item: número em círculo + título + descrição

**Item de Lista:**
```
[01]  Título do Diferencial
      Descrição do diferencial...
```

### 3.6 Testemunhos Section

**Estrutura:**
- Header com 5 estrelas + título
- Grid: `grid md:grid-cols-3 gap-10`

**Card de Depoimento:**
- Background: `bg-zinc-950`
- Border: `border border-zinc-800` → `hover:border-red-700/30`
- Border-radius: `rounded-3xl`
- Aspas decorativas grandes (opacity 30%)
- Texto do depoimento em itálico
- Avatar (inicial do nome) + Nome + Veículo

### 3.7 Antes e Depois Section

**Estrutura:**
- Container: `bg-zinc-900 p-8 md:p-20 rounded-[3rem]`
- Conteúdo centralizado
- Grid 2 colunas para imagens

**Elementos:**
- Título grande com destaque em vermelho
- Descrição
- 2 imagens lado a lado (Antes/Depois)
- Labels overlay em cada imagem
- CTA final

### 3.8 CTA Final Section

**Estrutura:**
- Background: Imagem com overlay escuro
- Conteúdo centralizado
- Título épico com gradiente
- Descrição
- CTA grande

### 3.9 Footer

**Estrutura:**
- Background: `bg-zinc-950 border-t border-zinc-900`
- Grid: `grid lg:grid-cols-4 md:grid-cols-2 gap-16`

**Colunas:**
1. Logo + descrição + redes sociais
2. Links de serviços
3. Contato (endereço, telefone, horário)
4. Mapa embed

**Bottom Bar:**
- Copyright
- Links: Termos, Privacidade, Desenvolvido

---

## 4. Special Behaviors

### 4.1 Scroll Behavior
- Smooth scrolling nativo via CSS: `scroll-behavior: smooth`
- Anchor links para seções: `#servicos`, `#sobre`

### 4.2 Sticky Elements
- Navbar: `position: fixed` com comportamento de glass ao scroll
- WhatsApp Button: `position: fixed` sempre visível

### 4.3 Responsive Breakpoints

| Breakpoint | Largura | Mudanças Principais |
|------------|---------|---------------------|
| Mobile | < 768px | Grid 1 coluna, fontes menores, menu hamburger |
| Tablet | 768px - 1024px | Grid 2 colunas, alguns ajustes de spacing |
| Desktop | > 1024px | Grid 4 colunas (serviços), layout completo |

**Mudanças específicas:**
- Hero: `text-5xl` → `md:text-9xl`
- Grid serviços: 1 coluna → 2 colunas → 4 colunas
- Navbar: Menu hamburger → Links inline
- Sobre: Stack vertical → 2 colunas
- Footer: 2 colunas → 4 colunas

---

## 5. Component Specifications

### 5.1 ButtonCTA Component

**Props:**
- `text: string` - Texto do botão
- `size: "sm" | "md" | "lg"` - Tamanho (default: "md")
- `className?: string` - Classes adicionais

**Estilos por tamanho:**
| Size | Padding | Fonte | Ícone |
|------|---------|-------|-------|
| sm | py-2 px-4 | text-sm | 16px |
| md | py-4 px-8 | text-base | 20px |
| lg | py-5 px-10 | text-lg | 28px |

**Classes base:**
```
inline-flex items-center justify-center gap-2 
bg-red-700 hover:bg-red-800 text-white font-bold 
rounded-lg transition-all duration-300 
transform hover:scale-105 
shadow-lg shadow-red-900/20 
uppercase tracking-wider
```

### 5.2 Logo Component

**Estrutura:**
```
┌─────┐  GARAGE
│  7  │  Estética Premium
└─────┘
```

**Specs:**
- Container: `w-10 h-10 bg-red-700 rounded-lg transform rotate-3`
- Número: `text-white font-black text-2xl -rotate-3`
- Texto: `text-white font-black text-xl tracking-tighter italic`
- Subtexto: `text-red-600 text-[10px] font-bold tracking-[0.2em] uppercase`

### 5.3 Section Component

**Props:**
- `children: React.ReactNode`
- `className?: string` - Classes adicionais
- `id?: string` - Para anchor links

**Classes base:**
```
py-16 px-6 md:py-24
max-w-6xl mx-auto
```

---

## 6. Assets & Resources

### 6.1 Imagens Unsplash Utilizadas

| Seção | URL | Descrição |
|-------|-----|-----------|
| Hero | `photo-1605559424843-9e4c228bf1c2` | Premium Detailing |
| Sobre 1 | `photo-1541899481282-d53bffe3c35d` | Premium VW |
| Sobre 2 | `photo-1614162692292-7ac56d7f7f1e` | Detailing Process |
| Sobre 3 | `photo-1544636331-e26879cd4d9b` | Reflective Surface |
| Sobre 4 | `photo-1494976388531-d1058494cdd8` | Wheel Detail |
| Serviço PPF | `photo-1621905252507-b352224adbc1` | PPF/Blindagem |
| Serviço Polimento | `photo-1619642751034-765dfdf7c58e` | Polimento |
| Serviço Coating | `photo-1552519507-da3b142c6e3d` | Carro brilhando |
| Serviço Moto | `photo-1558981403-c5f91cbba527` | Moto |
| Diferenciais | `photo-1599256621730-535171e28e50` | Garage work |
| Antes | `photo-1618843479313-40f8afb4b4d8` | Carro opaco |
| Depois | `photo-1605515298946-d062f2e9da53` | Carro brilhante |
| CTA Final | `photo-1492144534655-ae79c964c9d7` | Supercar texture |

### 6.2 Ícones (Lucide React)

Lista de ícones utilizados:
- `MessageCircle` - CTAs WhatsApp
- `Star` - Badge hero, avaliações
- `ShieldCheck` - Serviço PPF
- `Zap` - Serviço Polimento
- `Sparkles` - Serviço Coating
- `Award` - Serviço Motos
- `MapPin` - Footer endereço
- `Instagram` - Rede social
- `Phone` - Contato
- `Clock` - Horário funcionamento
- `CheckCircle2` - (reserva)
- `Menu` / `X` - Mobile menu

### 6.3 Fontes

**Google Fonts:**
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
```

---

## 7. Meta & SEO

### 7.1 Metadata
```json
{
  "name": "7 Garage Landing Page",
  "description": "Uma landing page premium para estética automotiva, focada em conversão via WhatsApp com design industrial e moderno."
}
```

### 7.2 Links Externos
- WhatsApp: `https://wa.me/5522999687719`
- Instagram: `https://www.instagram.com/7garageestetica/`
- Google Maps: Embed com coordenadas de Araruama, RJ

---

## 8. Notas de Implementação

### 8.1 Performance
- Imagens otimizadas via Unsplash `auto=format&fit=crop&q=80`
- Lazy loading no iframe do mapa
- Animações com GPU acceleration (transform, opacity)

### 8.2 Acessibilidade
- Cores com contraste adequado (texto claro em fundo escuro)
- Estados de foco nos botões
- Estrutura semântica de headings (h1 → h2 → h3)

### 8.3 Manutenção
- Componentes reutilizáveis (Section, Logo, ButtonCTA)
- Dados de serviços e depoimentos em arrays mapeados
- Configuração de cores via Tailwind extend

---

*Documento gerado seguindo o padrão SOP-PROCESSO-PREMIUM do HUB DE PROJETOS*
