import React from 'react';
import ResumeCard from './ResumeCard';

const ResumeList = ({ resumes, onDownload, onDelete }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {resumes.map((resume) => (
        <ResumeCard
          key={resume._id}
          resume={resume}
          onDownload={onDownload}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default ResumeList;
