<<<<<<< HEAD
const API_URL = "https://qmvrmx-5000.csb.app/api/applications";
=======
const API_URL = "http://localhost:5000/api/applications";
>>>>>>> 29b0bd5c1d8ca4629e34f0ed8b0148cb0f2ac0aa

// Получить все записи
export const fetchApplications = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Ошибка загрузки данных");
  return response.json();
};

// Добавить запись
<<<<<<< HEAD

// Используйте API_URL везде:
export const createApplication = async (application) => {
  //codesandbox.io/p/github/Burur1ch/job-application-tracker/main?workspaceId=2b2048ed-8f67-4ea8-912d-f11f62375be4
  https: if (!response.ok) {
    throw new Error("Ошибка при создании записи");
  }
=======
export const createApplication = async (application) => {
  const response = await fetch(`${API_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(application),
  });

  if (!response.ok) {
    throw new Error("Ошибка при создании записи");
  }

>>>>>>> 29b0bd5c1d8ca4629e34f0ed8b0148cb0f2ac0aa
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
