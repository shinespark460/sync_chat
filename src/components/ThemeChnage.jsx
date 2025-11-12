// import { useEffect, useState } from "react";

// const ThemeToggle = () => {
//   const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

//   useEffect(() => {
//     document.documentElement.setAttribute("data-theme", theme);
//     localStorage.setItem("theme", theme);
//   }, [theme]);

//   return (
//     <select
//       className="select select-bordered w-40"
//       value={theme}
//       onChange={(e) => setTheme(e.target.value)}
//     >
//       <option value="light">🌞 Light</option>
//       <option value="dark">🌙 Dark</option>
//       <option value="cupcake">🧁 Cupcake</option>
//       <option value="business">👔 Business</option>
//       <option value="synthwave">⚡ Synthwave</option>
//     </select>
//   );
// };

// export default ThemeToggle;

import { useEffect, useState } from "react";
import { Palette } from "lucide-react";
const ThemeToggle = () => {
  const themes = [
    "light",
    "dark",
    "cupcake",
    "bumblebee",
    "emerald",
    "corporate",
    "synthwave",
    "retro",
    "cyberpunk",
    "valentine",
    "halloween",
    "garden",
    "forest",
    "aqua",
    "lofi",
    "pastel",
    "fantasy",
    "wireframe",
    "black",
    "luxury",
    "dracula",
    "cmyk",
    "autumn",
    "business",
    "acid",
    "lemonade",
    "night",
    "coffee",
    "winter",
    "dim",
    "nord",
    "sunset",
    "caramellatte",
    "abyss",
    "silk",
  ];

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="flex flex-row items-center  gap-3">
      <label className="text-sm font-medium">
        <Palette size={24} />
      </label>
      <select
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
        className="select w-full outline-none border-b-[1px] font-semibold  text-base-content"
      >
        {themes.map((t) => (
          <option key={t} value={t}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ThemeToggle;
