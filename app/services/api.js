const API_URL = "http://localhost:5000/api/applications";

// Получить все записи
export const fetchApplications = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Ошибка загрузки данных");
  return response.json();
};

// Добавить запись
export const createApplication = async (application) => {
  const response = await fetch("/api/applications", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(application),
  });

  if (!response.ok) {
    throw new Error("Ошибка при создании записи");
  }

  return response.json();
};

// Обновить запись
export const updateApplication = async (id, applicationData) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(applicationData),
  });
  if (!response.ok) throw new Error("Ошибка обновления записи");
  return response.json();
};

// Удалить запись
export const deleteApplication = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Ошибка удаления записи");
  return response.json();
};
