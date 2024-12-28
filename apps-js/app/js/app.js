function generateRandomColor() {
  // Math.random() - возвращает псевдослучайное число от 0 (включительно) до 1 (не включая)
  // Math.floor() - округляет число вниз до ближайшего целого
  // * 16777215 - умножаем на максимальное значение для 6-значного шестнадцатеричного числа (FFFFFF в hex = 16777215 в decimal)
  // toString(16) - преобразует число в строку в шестнадцатеричном формате
  // padStart(6, "0") - дополняет строку нулями слева до длины 6 символов
  return (
    "#" + // добавляем символ решетки для формата HEX-цвета
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")
  );
}

function generateColorPalette(count = 5) {
  // count = 5 - параметр по умолчанию, если значение не передано
  const palette = []; // создаем пустой массив для хранения ц��етов

  // цикл for создает указанное количество цветов
  for (let i = 0; i < count; i++) {
    // push() - добавляет новый элемент в конец массива
    palette.push(generateRandomColor());
  }
  return palette; // возвращаем готовый массив цветов
}

// Примеры использования:

// 1. Получение одного случайного цвета:
const randomColor = generateRandomColor();
// Результат: например "#ff4521"

// 2. Получение палитры из нескольких цветов:
const threePalette = generateColorPalette(3);
// Результат: например ["#ff4521", "#23de89", "#7823ff"]

// 3. Получение палитры с количеством по умолчанию:
const defaultPalette = generateColorPalette();
// Результат: массив из 5 случайных цветов

// Применение цвета к элементу
const element = document.querySelector(".my-element");
element.style.backgroundColor = generateRandomColor();

// Создание цветных блоков
function createColorBlocks(count) {
  const palette = generateColorPalette(count);
  palette.forEach((color) => {
    const div = document.createElement("div");
    div.style.backgroundColor = color;
    div.style.width = "100px";
    div.style.height = "100px";
    document.body.appendChild(div);
  });
}

// Проверка на светлый/темный цвет
function isLightColor(color) {
  const hex = color.replace("#", "");
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);

  // Вычисляем яркость по формуле
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 128;
}
