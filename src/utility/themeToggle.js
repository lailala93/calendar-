export function themeToggle() {
  const sun = document.getElementById("sun");
  const moon = document.getElementById("moon");
  const bodyClass = document.body;

  const bunny = document.getElementById("bunnyIcon");
  // bunny.src = new URL("./images/dark_bunny.png", window.location.href).pathname;
  if (!bunny) return;

  const applyTheme = (theme) => {
    if (theme === "dark") {
      bodyClass.classList.add("dark-mode");
      bunny.src = "./images/dark_bunny.png";
    } else {
      bodyClass.classList.remove("dark-mode");
      if (bunny) bunny.src = "./images/bunny_icon.png";
    }
    localStorage.setItem("setTheme", theme);
  };
  const savedtheme = localStorage.getItem("setTheme") || "light";
  applyTheme(savedtheme);

  moon.addEventListener("click", () => applyTheme("dark"));
  sun.addEventListener("click", () => applyTheme("light"));

  // if (savedtheme === "dark") {
  //   bodyClass.classList.add("dark-mode");
  //   if (bunny) bunny.src = "images/dark_bunny.png";
  // } else {
  //   bodyClass.classList.remove("dark-mode");
  //   if (bunny) bunny.src = "images/bunny_icon.png";
  // }

  // moon.addEventListener("click", () => {
  //   if (!bodyClass.classList.contains("dark-mode")) {
  //     bodyClass.classList.add("dark-mode");
  //     bunny.src = "images/dark_bunny.png";
  //     localStorage.setItem("setTheme", "dark");
  //   }
  // });

  // sun.addEventListener("click", () => {
  //   bodyClass.classList.remove("dark-mode");
  //   bunny.src = "images/bunny_icon.png";
  //   localStorage.setItem("setTheme", "light");
  // });
}
