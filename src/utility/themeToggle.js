export function themeToggle() {
  const sun = document.getElementById("sun");
  const moon = document.getElementById("moon");
  const bodyClass = document.body;
  const savedtheme = localStorage.getItem("setTheme");
  const bunny = document.getElementById("bunnyIcon");

  if (savedtheme === "dark") {
    bodyClass.classList.add("dark-mode");
    bunny.src = "./images/dark_bunny.png";
  }

  moon.addEventListener("click", () => {
    if (!bodyClass.classList.contains("dark-mode")) {
      bodyClass.classList.add("dark-mode");
      bunny.src = "./images/dark_bunny.png";
      localStorage.setItem("setTheme", "dark");
    }
  });

  sun.addEventListener("click", () => {
    bodyClass.classList.remove("dark-mode");
    bunny.src = "./images/bunny_icon.png";
    localStorage.setItem("setTheme", "light");
  });
}
