import React from 'react';

const TagInputSection = ({ title, placeholder, value, setValue, data, onAdd, onRemove, badgeStyle }) => (
  <div className="card bg-base-200 shadow-md">
    <div className="card-body">
      <h2 className="card-title text-xl mb-4">{title}</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          className="input input-bordered flex-grow"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
        />
        <button type="button" className="btn btn-primary" onClick={onAdd}>Add</button>
      </div>
      <div className="flex flex-wrap gap-2">
        {data.map((item, index) => (
          <div key={index} className={`badge ${badgeStyle} gap-2`}>
            {item}
            <button type="button" className="text-xs" onClick={() => onRemove(index)}>✕</button>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default TagInputSection;
