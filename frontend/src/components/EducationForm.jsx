import React from 'react';

const EducationForm = ({ data, onChange, onAdd, onRemove }) => (
  <div className="card bg-base-200 shadow-md">
    <div className="card-body">
      <div className="flex justify-between items-center mb-4">
        <h2 className="card-title text-xl">Education*</h2>
        <button type="button" className="btn btn-sm btn-primary" onClick={onAdd}>Add Education</button>
      </div>
      {data.map((edu, index) => (
        <div key={edu.id} className="mb-6 p-4 bg-base-100 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">Education #{index + 1}</h3>
            {data.length > 1 && (
              <button type="button" className="btn btn-sm btn-ghost text-error" onClick={() => onRemove(edu.id)}>Remove</button>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label mb-2">Degree*</label>
              <input type="text" className="input input-bordered" value={edu.degree} onChange={(e) => onChange('education', 'degree', e.target.value, index)} />
            </div>
            <div className="form-control">
              <label className="label mb-2">Institution*</label>
              <input type="text" className="input input-bordered" value={edu.institution} onChange={(e) => onChange('education', 'institution', e.target.value, index)} />
            </div>
            <div className="form-control">
              <label className="label mb-2">Field of Study</label>
              <input type="text" className="input input-bordered" value={edu.fieldOfStudy} onChange={(e) => onChange('education', 'fieldOfStudy', e.target.value, index)} />
            </div>
            <div className="form-control">
              <label className="label mb-2">Graduation Year*</label>
              <input type="number" className="input input-bordered" value={edu.graduationYear} onChange={(e) => onChange('education', 'graduationYear', e.target.value, index)} min="1900" max={new Date().getFullYear() + 5} />
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default EducationForm;
