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
    // 1. Генерация случайного числа
    const randomNumber = Math.floor(Math.random() * 16777215);
    // Math.random() генерирует число от 0 до 1
    // 16777215 это максимальное число для RGB (в десятичной системе, равно FFFFFF в hex)
    // Math.floor() округляет до целого числа

    // 2. Преобразование в шестнадцатеричный формат
    const hexString = randomNumber.toString(16);
    // toString(16) преобразует число в шестнадцатеричную строку

    // 3. Добавление нулей в начало, если длина меньше 6 символов
    const paddedHex = hexString.padStart(6, "0");
    // padStart(6, "0") добавляет нули в начало строки, если она короче 6 символов

    // 4. Формирование полного HEX-кода цвета
    const color = "#" + paddedHex;
    // Добавляем # в начало для создания валидного CSS цвета

    // 5. Применение цвета к элементам
    colorFrame.style.backgroundColor = color; // Меняем цвет блока
    colorText.textContent = color; // Отображаем HEX-код
  });
});
