import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const WbThemeSwitch = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const toggleTheme = () => {
    const newTheme = !isDarkTheme;
    setIsDarkTheme(newTheme);
    const theme = newTheme ? "dark" : "light";
    localStorage.setItem("theme", theme);
    document.querySelector("html").classList.add(theme);
    document
      .querySelector("html")
      .classList.remove(newTheme ? "light" : "dark");
  };

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme) {
      document.querySelector("html").classList.add(theme);
    } else {
      document.querySelector("html").classList.add("light");
    }
  }, []);

  return (
    <div className="mode_switcher">
      {isDarkTheme ? (
        <span className="dark is_active" onClick={toggleTheme}>
          <Moon size={25} className="text-white" />
        </span>
      ) : (
        <span className="light is_active" onClick={toggleTheme}>
          <Sun size={25} className="text-white" />
        </span>
      )}
    </div>
  );
};
export default WbThemeSwitch;
