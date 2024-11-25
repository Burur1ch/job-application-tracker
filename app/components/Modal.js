'use client';

import React, { useState, useEffect } from 'react';

const Modal = ({ isOpen, onClose, onSubmit, initialData = {} }) => {
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    salary: '',
    status: '',
    note: '',
  });

  // Если initialData меняется (например, при редактировании), обновляем состояние
  useEffect(() => {
    if (initialData) {
      setFormData({
        company: initialData.company || '',
        position: initialData.position || '',
        salary: initialData.salary || '',
        status: initialData.status || '',
        note: initialData.note || '',
      });
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
    setFormData({ company: '', position: '', salary: '', status: '', note: '' });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">
          {initialData?.id ? 'Редактировать запись' : 'Добавить запись'}
        </h2>
        <div className="space-y-4">
          <input
            type="text"
            name="company"
            placeholder="Компания"
            value={formData.company}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
          />
          <input
            type="text"
            name="position"
            placeholder="Вакансия"
            value={formData.position}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
          />
          <input
            type="text"
            name="salary"
            placeholder="Зарплатная вилка"
            value={formData.salary}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
          />
          <input
            type="text"
            name="status"
            placeholder="Статус"
            value={formData.status}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
          />
          <textarea
            name="note"
            placeholder="Заметка"
            value={formData.note}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 mr-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Отмена
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Сохранить
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
