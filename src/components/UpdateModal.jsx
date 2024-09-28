import React, { useEffect, useState } from "react";

export const UpdateModal = ({ isOpen, onClose, onConfirm, currentText }) => {
  const [updatedText, setUpdatedText] = useState(currentText);

  const isValidInput = (input) => {
    const regex = /^[a-zA-Z0-9.,!? ]*$/;

    if (!regex.test(input)) return false;

    if (input.startsWith(".") || input.startsWith("?")) return false;

    const dotCount = (input.match(/\./g) || []).length;
    if (dotCount > 1) return false;

    const questionMarkCount = (input.match(/\?/g) || []).length;
    if (
      questionMarkCount > 1 ||
      (questionMarkCount === 1 && !input.endsWith("?"))
    ) {
      return false;
    }

    return true;
  };

  const handleUpdate = () => {
    const trimmedText = updatedText.trim();

    if (!isValidInput(trimmedText) || trimmedText === "") {
      alert(
        "Input tidak valid. Tidak boleh dimulai dengan '.' atau '?' dan harus berisi karakter yang benar."
      );
      return;
    }

    onConfirm(trimmedText);
  };

  useEffect(() => {
    const handleEnterKey = (e) => {
      if (e.key === "Enter") {
        handleUpdate();
      }
    };

    window.addEventListener("keydown", handleEnterKey);

    return () => {
      window.removeEventListener("keydown", handleEnterKey);
    };
  }, [updatedText]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-dark p-6 rounded-lg shadow-lg grid gap-5">
        <h2 className="text-xl font-bold dark:text-white">Edit Data</h2>
        <input
          type="text"
          value={updatedText}
          onChange={(e) => setUpdatedText(e.target.value)}
          className="border dark:text-white dark:bg-slate-700 px-4 py-2 rounded-full w-72 focus:outline-primary dark:focus:outline-white"
        />
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded-full font-semibold text-xs hover:border-red-500 hover:text-white hover:shadow-lg hover:opacity-80 transition duration-300 ease-in-out">
            Cancel
          </button>
          <button
            onClick={() => onConfirm(updatedText)}
            className="bg-primary text-white px-4 py-2 rounded-full font-semibold text-xs hover:border-primary hover:text-white hover:shadow-lg hover:opacity-80 transition duration-300 ease-in-out">
            Update
          </button>
        </div>
      </div>
    </div>
  );
};
