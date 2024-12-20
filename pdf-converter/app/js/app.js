async function generatePDF() {
  // Получение данных из формы
  const form = document.getElementById("patientForm");
  const data = {
    ownerName: form.ownerName.value,
    phone: form.phone.value,
    petName: form.petName.value,
    weight: form.weight.value,
    age: form.age.value,
  };

  // Определение документа
  const docDefinition = {
    content: [
      {
        text: "Карта пациента",
        style: "header",
        alignment: "center",
      },
      {
        text: `Имя и Фамилия владельца: ${data.ownerName}`,
        style: "field",
      },
      {
        text: `Телефон: ${data.phone}`,
        style: "field",
      },
      {
        text: `Имя питомца: ${data.petName}`,
        style: "field",
      },
      {
        text: `Вес (кг): ${data.weight}`,
        style: "field",
      },
      {
        text: `Возраст (лет): ${data.age}`,
        style: "field",
      },
    ],
    styles: {
      header: {
        fontSize: 16,
        color: "#4CAF50",
        bold: true,
        margin: [0, 0, 0, 15],
      },
      field: {
        fontSize: 12,
        margin: [0, 0, 0, 10],
      },
    },
  };

  // Создание и скачивание PDF
  pdfMake.createPdf(docDefinition).download("patient_card.pdf");
}
