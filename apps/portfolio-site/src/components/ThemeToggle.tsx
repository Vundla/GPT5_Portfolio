import { Component, createSignal, createEffect } from "solid-js";

interface ThemeToggleProps {
  onToggle?: (isDark: boolean) => void;
}

const ThemeToggle: Component<ThemeToggleProps> = (props) => {
  const [isDark, setIsDark] = createSignal(false);

  createEffect(() => {
    // Check system preference on mount
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const savedTheme = localStorage.getItem("theme");
    
    if (savedTheme) {
      setIsDark(savedTheme === "dark");
    } else {
      setIsDark(prefersDark);
    }
  });

  createEffect(() => {
    document.documentElement.setAttribute("data-theme", isDark() ? "dark" : "light");
    localStorage.setItem("theme", isDark() ? "dark" : "light");
    props.onToggle?.(isDark());
  });

  const toggle = () => setIsDark(!isDark());

  return (
    <button
      class="theme-toggle"
      onClick={toggle}
      aria-label={`Switch to ${isDark() ? "light" : "dark"} mode`}
      title={`Switch to ${isDark() ? "light" : "dark"} mode`}
    >
      <div class="toggle-track">
        <span class="toggle-icon sun">☀️</span>
        <span class="toggle-icon moon">🌙</span>
        <div class={`toggle-thumb ${isDark() ? "dark" : ""}`} />
      </div>
    </button>
  );
};

export default ThemeToggle;
