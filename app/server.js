const express = require("express"); // Подключаем Express
const mongoose = require("mongoose"); // Подключаем Mongoose
const cors = require("cors"); // Подключаем CORS для работы с фронтендом
const bodyParser = require("body-parser");

const Application = require("./models/Applicatoin"); // Импортируем модель

const app = express(); // Создаём приложение Express
const PORT = 5000; // Порт, на котором будет работать сервер

// Middleware
app.use(cors()); // Разрешаем запросы с другого домена (например, с фронтенда)
app.use(bodyParser.json()); // Подключаем парсер JSON

mongoose
  .connect(
    "mongodb+srv://qwer:qwerty09@bool.kgro2.mongodb.net/?retryWrites=true&w=majority&appName=Bool"
  )
  .then(() => console.log("✅ Подключено к MongoDB"))
  .catch((error) => console.error("❌ Ошибка подключения к MongoDB:", error));
// Маршруты API

// Получить все записи
app.get("/api/applications", async (req, res) => {
  try {
    const applications = await Application.find(); // Получаем все записи из MongoDB
    res.json(applications); // Отправляем их клиенту
  } catch (error) {
    res.status(500).json({ message: "Ошибка получения данных" });
  }
});

// Добавить новую запись
app.post("/api/applications", async (req, res) => {
  const { company, position, salary, status, note } = req.body;

  try {
    const newApplication = new Application({
      company,
      position,
      salary,
      status,
      note,
    });

    await newApplication.save(); // Сохраняем запись в базе
    res.json(newApplication); // Отправляем новую запись клиенту
  } catch (error) {
    res.status(500).json({ message: "Ошибка добавления записи" });
  }
});

// Обновить запись
app.put("/api/applications/:id", async (req, res) => {
  const { id } = req.params; // Получаем ID из URL
  const { company, position, salary, status, note } = req.body;

  try {
    const updatedApplication = await Application.findByIdAndUpdate(
      id,
      { company, position, salary, status, note },
      { new: true } // Опция возвращает обновлённый документ
    );
    res.json(updatedApplication);
  } catch (error) {
    res.status(500).json({ message: "Ошибка обновления записи" });
  }
});

// Удалить запись
app.delete("/api/applications/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await Application.findByIdAndDelete(id); // Удаляем запись по ID
    res.json({ message: "Запись удалена" });
  } catch (error) {
    res.status(500).json({ message: "Ошибка удаления записи" });
  }
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`✅ Сервер запущен на http://localhost:${PORT}`);
});
