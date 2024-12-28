document.addEventListener("DOMContentLoaded", () => {
  // Находим все нужные элементы
  const colorFrame = document.querySelector(".color-frame");
  const colorText = document.querySelector("p");
  const generateBtn = document.querySelector("button");

  // Устанавливаем начальный цвет
  const defaultColor = "#808080";
  colorFrame.style.backgroundColor = defaultColor;
  colorText.textContent = defaultColor;

  // Добавляем обработчик на кнопку
  generateBtn.addEventListener("click", () => {
    const color =
      "#" +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0");
    colorFrame.style.backgroundColor = color;
    colorText.textContent = color;
  });
});
