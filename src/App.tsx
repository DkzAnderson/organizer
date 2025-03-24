import { Outlet } from "react-router"
import { useTheme } from "./context/ThemeProvider"

function App() {
  const { toggleTheme } = useTheme();

  return (
    <main className="w-full min-h-screen bg-[var(--st-light)] dark:bg-[var(--st-dark)]">
      <button
        onClick={toggleTheme}
        className="w-full dark:bg-[var(--th)] bg-[var(--th)] font-bold text-white py-2"
      >
        Cambiar Tema
      </button>
      <Outlet />
    </main>
  );
}

export default App;

