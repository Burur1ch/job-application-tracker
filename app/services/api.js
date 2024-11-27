const API_URL = "https://qmvrmx-5000.csb.app/api/applications";

// Получить все записи
export const fetchApplications = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Ошибка загрузки данных");
  return response.json();
};

// Добавить запись

// Используйте API_URL везде:
export const createApplication = async (application) => {
  //codesandbox.io/p/github/Burur1ch/job-application-tracker/main?workspaceId=2b2048ed-8f67-4ea8-912d-f11f62375be4
  https: if (!response.ok) {
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
