'use client';

import React, { useState } from 'react';
import Modal from './components/Modal';

const Home = () => {
  const [applications, setApplications] = useState([
    {
      id: 1,
      company: 'Компания 1',
      position: 'Frontend Developer',
      salary: '1000-2000$',
      status: 'Ожидание ответа',
      note: 'Отправлено 2 дня назад',
    },
  ]);
  const [editingApplication, setEditingApplication] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleAddApplication = (newApplication) => {
    setApplications((prev) => [
      ...prev,
      { ...newApplication, id: prev.length + 1 },
    ]);
  };

  const handleDelete = (id) => {
    setApplications((prev) => prev.filter((app) => app.id !== id));
  };  

  const handleEdit = (id) => {
    const appToEdit = applications.find((app) => app.id === id);
    setEditingApplication(appToEdit);
    setModalOpen(true);
  };

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
          </tr>
        </thead>
        <tbody>
  {applications.map((app) => (
    <tr key={app.id} className="hover:bg-gray-50">
      <td className="border p-2">{app.company}</td>
      <td className="border p-2">{app.position}</td>
      <td className="border p-2">{app.salary}</td>
      <td className="border p-2">{app.status}</td>
      <td className="border p-2">{app.note}</td>
      <td className="border p-2 flex gap-2 justify-center">
        <button
          onClick={() => handleEdit(app.id)}
          className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          Редактировать
        </button>
        <button
          onClick={() => handleDelete(app.id)}
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
  onSubmit={(data) => {
    if (editingApplication) {
      setApplications((prev) =>
        prev.map((app) =>
          app.id === editingApplication.id ? { ...app, ...data } : app
        )
      );
      setEditingApplication(null);
    } else {
      handleAddApplication(data);
    }
    setModalOpen(false);
  }}
  initialData={editingApplication}
/>

    </div>
  );
};

export default Home;
