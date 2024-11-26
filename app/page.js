"use client";

import React, { useState, useEffect } from "react";
import Modal from "./components/Modal";
import {
  fetchApplications,
  createApplication,
  updateApplication,
  deleteApplication,
} from "./services/api";

const Home = () => {
  const [applications, setApplications] = useState([]); // Данные из API
  const [editingApplication, setEditingApplication] = useState(null); // Для редактирования
  const [isModalOpen, setModalOpen] = useState(false); // Управление модальным окном
  const [loading, setLoading] = useState(true); // Состояние загрузки
  const [error, setError] = useState(null); // Ошибки

  // Загружаем данные с сервера
  useEffect(() => {
    const loadApplications = async () => {
      try {
        const data = await fetchApplications();
        setApplications(data);
      } catch (err) {
        setError("Ошибка загрузки данных");
      } finally {
        setLoading(false);
      }
    };

    loadApplications();
  }, []);

  // Добавление новой записи
  const handleAddApplication = async (newApplication) => {
    try {
      const addedApplication = await createApplication(newApplication);
      setApplications((prev) => [...prev, addedApplication]);
    } catch (err) {
      setError("Ошибка добавления записи");
    }
  };

  // Удаление записи
  const handleDelete = async (id) => {
    if (!confirm("Вы уверены, что хотите удалить эту запись?")) return;

    try {
      await deleteApplication(id);
      setApplications((prev) => prev.filter((app) => app._id !== id));
    } catch (err) {
      setError("Ошибка удаления записи");
    }
  };

  // Открытие модального окна для редактирования
  const handleEdit = (id) => {
    const appToEdit = applications.find((app) => app._id === id);
    setEditingApplication(appToEdit);
    setModalOpen(true);
  };

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Отклики на вакансии</h1>
      <button
        onClick={() => setModalOpen(true)}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        + Добавить запись
      </button>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border p-2 bg-gray-100">Компания</th>
            <th className="border p-2 bg-gray-100">Вакансия</th>
            <th className="border p-2 bg-gray-100">Зарплатная вилка</th>
            <th className="border p-2 bg-gray-100">Статус</th>
            <th className="border p-2 bg-gray-100">Заметка</th>
            <th className="border p-2 bg-gray-100">Действия</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <tr key={app._id} className="hover:bg-gray-50">
              <td className="border p-2">{app.company}</td>
              <td className="border p-2">{app.position}</td>
              <td className="border p-2">{app.salary}</td>
              <td className="border p-2">{app.status}</td>
              <td className="border p-2">{app.note}</td>
              <td className="border p-2 flex gap-2 justify-center">
                <button
                  onClick={() => handleEdit(app._id)}
                  className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  Редактировать
                </button>
                <button
                  onClick={() => handleDelete(app._id)}
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Удалить
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingApplication(null);
        }}
        onSubmit={async (data) => {
          try {
            if (editingApplication) {
              const updatedApplication = await updateApplication(
                editingApplication._id,
                data
              );
              setApplications((prev) =>
                prev.map((app) =>
                  app._id === updatedApplication._id ? updatedApplication : app
                )
              );
              setEditingApplication(null);
            } else {
              await handleAddApplication(data);
            }
            setModalOpen(false);
          } catch (err) {
            setError("Ошибка сохранения записи");
          }
        }}
        initialData={editingApplication}
      />
    </div>
  );
};

export default Home;
