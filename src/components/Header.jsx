import { useTheme } from '../context/ThemeContext';

export default function Header() {

  const { theme, toggleTheme } = useTheme();

  return (
    <header className="header">
      <h1>HelpDesk Queue</h1>
      <button onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
      </button>
    </header>
  );
}