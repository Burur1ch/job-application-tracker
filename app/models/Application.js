const mongoose = require("mongoose"); // Импортируем mongoose

// Определяем схему для вакансии
const applicationSchema = new mongoose.Schema(
  {
    company: { type: String, required: true }, // Название компании
    position: { type: String, required: true }, // Должность
    salary: { type: String, required: true }, // Зарплатная вилка (например, "1000-2000$")
    status: { type: String, required: true }, // Статус отклика (например, "Ожидание ответа")
    note: { type: String, required: false }, // Заметки
  },
  { timestamps: true }
); // Включаем автоматическое добавление времени создания/обновления

// Создаём модель на основе схемы
const Application = mongoose.model("Application", applicationSchema);

// Экспортируем модель для использования в других файлах
module.exports = Application;
