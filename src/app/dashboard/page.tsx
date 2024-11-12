"use client";
import React, { useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import FileUploader from "../components/FileUploader";

//interfaces
import CreateProjectInterface from "../interfaces/CreateProjectInterface";

const CreateProject = () => {
  const [formData, setFormData] = useState<CreateProjectInterface>({
    markdownContent: "",
    date: "",
    amount: 0,
  });
  const [selFiles, setSelFiles] = useState<File[]>([]);

  const handleMarkdownChange = (content: string | undefined) => {
    setFormData((prevData) => ({
      ...prevData,
      markdownContent: content || "",
    }));
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({ ...prevData, date: event.target.value }));
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    setFormData((prevData) => ({
      ...prevData,
      amount: isNaN(value) ? 0 : value,
    }));
  };

  const handleonFilesChange = (files: File[]) => {
    setSelFiles(files);
  };
  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md width-full mx-auto space-y-4">
      {/* Markdown Editor */}
      <div className="space-y-2">
        <label className="block text-gray-700 font-semibold">
          Project Details
        </label>
        <MDEditor
          value={formData.markdownContent}
          onChange={handleMarkdownChange}
          className="w-full bg-white rounded-md shadow-sm border border-gray-300"
        />
      </div>

      <div className="flex flex-col md:flex-row">
        {/* Date Picker */}
        <div className="space-y-2 w-full md:w-1/2 md:mr-2">
          <label className="block text-gray-700 font-semibold">
            Project Duration
          </label>
          <input
            type="date"
            value={formData.date}
            onChange={handleDateChange}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        {/* Amount Input */}
        <div className="space-y-2 w-full md:w-1/2 md:ml-2">
          <label className="block text-gray-700 font-semibold">
            Amount Sought ( in RBTC)
          </label>
          <input
            type="number"
            value={formData.amount}
            onChange={handleAmountChange}
            placeholder="0.00"
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
      </div>

      {/* File Uploader */}
      <FileUploader onFilesChange={handleonFilesChange} />

      <div className="text-center">
        <button className="mt-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed">
          Create new project
        </button>
      </div>
    </div>
  );
};

export default CreateProject;
