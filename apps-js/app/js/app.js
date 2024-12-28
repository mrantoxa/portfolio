document.addEventListener("DOMContentLoaded", () => {
  // Обновляем селекторы
  const colorWrapper = document.querySelector(".color-wrapper");
  const colorFrame = document.querySelector(".color-frame");
  const colorText = document.querySelector(".color-info p");
  const copyBtn = document.querySelector(".copy-btn");
  const colorInfo = document.querySelector(".color-info");
  const generateBtn = document.querySelector(".btn-generate");

  // Функция генерации случайного цвета
  const generateRandomColor = () => {
    const color =
      "#" +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0");

    colorFrame.style.backgroundColor = color;
    colorText.textContent = color;
    return color;
  };

  // Функция запуска рулетки цветов
  const startColorRoulette = () => {
    copyBtn.classList.remove("visible");

    // Создаем и показываем прелоадер
    const loader = document.createElement("div");
    loader.className = "loader";
    colorInfo.appendChild(loader);

    let counter = 0;
    const maxIterations = 10;
    const interval = setInterval(() => {
      generateRandomColor();
      counter++;

      if (counter >= maxIterations) {
        clearInterval(interval);
        // Удаляем прелоадер и показываем кнопку
        loader.remove();
        copyBtn.classList.add("visible");
      }
    }, 200);
  };

  // Функция копирования в буфер обмена
  const copyToClipboard = (event) => {
    // Предотвращаем всплытие события
    event.preventDefault();
    event.stopPropagation();

    const text = colorText.textContent;
    navigator.clipboard
      .writeText(text)
      .then(() => {
        // Скрываем кнопку
        copyBtn.style.display = "none";

        const notification = document.createElement("span");
        notification.textContent = "Copied to clipboard!";
        notification.className = "copy-notification";

        // Вставляем уведомление на место кнопки
        copyBtn.parentNode.insertBefore(notification, copyBtn);

        setTimeout(() => {
          // Удаляем уведомление и показываем кнопку обратно
          notification.remove();
          copyBtn.style.display = "flex";
        }, 1000);
      })
      .catch((err) => {
        console.error("Failed to copy:", err);
      });
  };

  // Запускаем рулетку при загрузке страницы
  startColorRoulette();

  // Добавляем обработчик с явным указанием на клик
  copyBtn.onclick = copyToClipboard;
  generateBtn.addEventListener("click", startColorRoulette);

  // Добавляем проверку для отладки
  console.log("Elements found:", {
    colorWrapper: !!colorWrapper,
    colorFrame: !!colorFrame,
    colorText: !!colorText,
    copyBtn: !!copyBtn,
    generateBtn: !!generateBtn,
    notificationArea: !!colorInfo,
  });

  // Проверяем в консоли
  console.log("Copy button:", copyBtn);
  copyBtn.addEventListener("click", () => {
    console.log("Copy button clicked");
  });
});
