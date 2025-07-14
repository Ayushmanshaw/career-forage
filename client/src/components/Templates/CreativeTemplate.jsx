import React from 'react';

const CreativeTemplate = ({ data }) => {
  return (
    <div className="creative-template p-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg">
      <h1 className="text-3xl font-extrabold mb-4">{data.personalInfo.fullName}</h1>
      <p className="mb-2">{data.personalInfo.email} | {data.personalInfo.phone}</p>

      <section className="mb-4">
        <h2 className="text-lg font-semibold">Professional Summary</h2>
        <p>{data.professionalSummary}</p>
      </section>

      <section className="mb-4">
        <h2 className="text-lg font-semibold">Skills & Expertise</h2>
        <ul className="flex flex-wrap gap-2">
          {data.skills.map((skill, idx) => (
            <li key={idx} className="badge badge-outline border-white text-white">{skill}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold">Certifications</h2>
        <ul>
          {data.certifications.map((cert, idx) => (
            <li key={idx}>{cert}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default CreativeTemplate;
