import React from 'react';

const ResumeCard = ({ resume, onDownload, onDelete }) => {
  const fullName = resume.data?.personalInfo?.fullName || 'Untitled Resume';

  const previewImage = `/assets/templates/${resume.template}-preview.png`;

  return (
    <div className="bg-base-200 p-4 rounded-lg shadow-md">
      <img
        src={previewImage}
        alt={`${resume.template} preview`}
        className="w-full h-48 object-cover rounded mb-4"
      />

      <h3 className="text-lg font-bold mb-1">{fullName}</h3>
      <p className="text-sm mb-2">Template: {resume.template}</p>

      <div className="flex justify-between items-center">
        <button
          className="btn btn-primary btn-sm"
          onClick={() => onDownload(resume)}
        >
          Download
        </button>

        <button
          className="btn btn-error btn-sm"
          onClick={() => onDelete(resume._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ResumeCard;
