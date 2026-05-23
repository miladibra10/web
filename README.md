# Personal Website

**Live: [miladibra.com](https://miladibra.com)**

A modern, terminal-inspired personal website that mimics a coding agent interface. It features a command-driven UI, simulated thinking process, and a touch of humor for generic prompts.


## 🚀 Features

- **Custom Terminal UI**: A high-performance, responsive terminal interface built with React and Tailwind CSS.
- **Command Parser**: Smart command identification and keyword-based fallback.
- **Thinking Simulation**: Multi-step asynchronous thinking process (`FETCHING_METADATA`, `PARSING_CMD`, etc.).
- **Token Tracking**: Real-time "token usage" counter that increases as the agent "generates" responses.
- **Auto-completion**: Tab-to-complete and arrow-key navigation for command suggestions.
- **GitHub Integration**: Dynamic fetching of open-source contributions via the GitHub API.

## 🛠 Tech Stack

- **Framework**: [React 19](https://react.dev/) + [Vite 8](https://vite.dev/)
- **Styling**: [Tailwind CSS 3](https://tailwindcss.com/)
- **Animations**: [Framer Motion 12](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 🏃 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone git@github.com:miladibra10/web.git
   cd web
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running for Development

To start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

### Building for Production

To create an optimized production-ready build:

```bash
npm run build
```

The output will be in the `dist/` directory.

### Previewing Production Build

To preview the build locally:
```bash
npm run preview
```

## 🧪 Testing & Quality Control

### Manual Testing
1. **Open the app** in your browser.
2. **Type `/`** to see the command suggestion popover.
3. **Use Tab or Arrow Keys** to navigate and select commands.
4. **Try commands** like `/about`, `/projects`, `/contributions`, and `/contact`.
5. **Send a generic message** (e.g., "Hello") to see the humor module and "API credit" check.
6. **Clear the terminal** using `/clear` and watch the token count reset.

### Linting
To check for code quality:
```bash
npm run lint
```

## 🤖 Commands

| Command | Description |
| :--- | :--- |
| `/help` | Show all available commands |
| `/about` | Learn more about the developer |
| `/projects` | View recent work and personal projects |
| `/contributions` | Fetch recent open-source contributions from GitHub |
| `/contact` | Find social links and contact info |
| `/clear` | Clear the terminal history and reset token count |

## 📝 License

Distributed under the MIT License.
