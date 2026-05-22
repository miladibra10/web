# Agent Personal Website

A modern, terminal-inspired personal website that mimics a coding agent interface (like Junie or Claude). It features a command-driven UI, simulated thinking process, and a touch of humor for generic prompts.

## 🚀 Features

- **Terminal Simulation**: Uses `xterm.js` for a professional-grade, high-performance terminal experience.
- **Command Parser**: Custom commands (`help`, `about`, `projects`, `contact`, `clear`) with ANSI color support.
- **Thinking Simulation**: Simulated background tasks with asynchronous status updates.
- **Humor Integration**: Funny responses for non-command inputs with simulated API credit checks.
- **Dark Mode UI**: Sleek, high-contrast dark theme with a scanline effect and a decorative terminal frame.
- **Responsive Design**: Auto-scaling terminal viewport that adapts to various screen sizes.

## 🛠 Tech Stack

- **Framework**: [React](https://react.dev/) + [Vite](https://vite.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 🏃 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd personal-website
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running for Development

To start the development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

### Building for Production

To create a production-ready build:

```bash
npm run build
```

The output will be in the `dist/` directory.

### Previewing Production Build

To preview the build locally:
```bash
npm run preview
```

## 🧪 Testing

### Manual Testing
1. **Open the app** in your browser.
2. **Type `/help`** to see available commands.
3. **Try other commands** like `/about`, `/projects`, and `/contact`.
4. **Send a generic message** (e.g., "Hello") to see the humor module in action.
5. **Check responsiveness** by resizing the browser window.

### Linting
To check for code quality and potential issues:
```bash
npm run lint
```

## 🤖 Commands

| Command | Description |
| :--- | :--- |
| `/help` | Show all available commands |
| `/about` | Learn more about the developer |
| `/projects` | View recent work and deployments |
| `/contact` | Find social links and contact info |
| `/clear` | Clear the terminal history |

## 📝 License

Distributed under the MIT License.
# web
