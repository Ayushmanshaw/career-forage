import React from 'react';

const ResumeCard = ({ resume, onDownload }) => {
  const fullName = resume.data?.personalInfo?.fullName || 'Untitled Resume';

  // You can replace this with actual preview from backend later
  const previewImage = `/assets/templates/${resume.template}-preview.png`; // Example: modern-preview.png

  return (
    <div className="bg-base-200 p-4 rounded-lg shadow-md">
      <img
        src={previewImage}
        alt={`${resume.template} preview`}
        className="w-full h-48 object-cover rounded mb-4"
      />

      <h3 className="text-lg font-bold mb-1">{fullName}</h3>
      <p className="text-sm mb-2">Template: {resume.template}</p>

      <div className="flex justify-between">
        <button className="btn btn-primary btn-sm" onClick={() => onDownload(resume)}>
          Download
        </button>
      </div>
    </div>
  );
};

export default ResumeCard;


