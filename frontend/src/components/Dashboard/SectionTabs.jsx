import React from 'react';

const SectionTabs = ({ activeSection, setActiveSection }) => {
  const sections = ['Resume', 'Cover Letter', 'Portfolio'];

  return (
    <div className="tabs tabs-boxed mb-6">
      {sections.map((section) => (
        <button
          key={section}
          className={`tab ${activeSection === section ? 'tab-active' : ''}`}
          onClick={() => setActiveSection(section)}
        >
          {section}
        </button>
      ))}
    </div>
  );
};

export default SectionTabs;