async function generatePDF() {
  const { jsPDF } = window.jspdf;

  // Получение данных из формы
  const form = document.getElementById("patientForm");
  const data = {
    ownerName: form.ownerName.value,
    phone: form.phone.value,
    petName: form.petName.value,
    weight: form.weight.value,
    age: form.age.value,
  };

  // Создание PDF
  const pdf = new jsPDF();

  // Настройка базового дизайна
  const headerStyle = { fontSize: 16, textColor: "#4CAF50", fontStyle: "bold" };
  const bodyStyle = { fontSize: 12, textColor: "#000000" };

  // Заголовок
  pdf.setFont("Arial", headerStyle.fontStyle);
  //   pdf.addFileToVFS("Roboto-Regular.ttf", RobotoNormal);
  //   pdf.addFont("Roboto-Regular.ttf", "Roboto", "normal");
  pdf.setFontSize(headerStyle.fontSize);
  pdf.setTextColor(headerStyle.textColor);
  pdf.text("Карта пациента", 105, 20, { align: "center" });

  // Данные формы
  pdf.setFontSize(bodyStyle.fontSize);
  pdf.setTextColor(bodyStyle.textColor);

  let startY = 40;
  const lineHeight = 10;

  pdf.text(`Имя и Фамилия владельца: ${data.ownerName}`, 20, startY);
  startY += lineHeight;
  pdf.text(`Телефон: ${data.phone}`, 20, startY);
  startY += lineHeight;
  pdf.text(`Имя питомца: ${data.petName}`, 20, startY);
  startY += lineHeight;
  pdf.text(`Вес (кг): ${data.weight}`, 20, startY);
  startY += lineHeight;
  pdf.text(`Возраст (лет): ${data.age}`, 20, startY);

  // Скачивание PDF
  pdf.save("patient_card.pdf");
}

// Фон и цветовая тема
pdf.setFillColor("#333");
pdf.rect(0, 0, 210, 297, "F"); // Заполнение страницы серым фоном

// Заголовок с цветным подчеркиванием
pdf.setDrawColor("#4CAF50");
pdf.setLineWidth(1.5);
pdf.line(20, 25, 190, 25);
