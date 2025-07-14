import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ResumeTemplates = () => {
  const navigate = useNavigate();
  const templates = [
    {
      id: 'modern',
      name: 'Modern',
      description: 'Clean layout with emphasis on skills and experience',
      previewImage: 'https://placehold.co/600x800/1e3a8a/ffffff?text=Modern+Template',
      bestFor: 'Tech, Creative, Professional roles'
    },
    {
      id: 'classic',
      name: 'Classic',
      description: 'Traditional format preferred by conservative industries',
      previewImage: 'https://placehold.co/600x800/1a365d/ffffff?text=Classic+Template',
      bestFor: 'Finance, Law, Government'
    },
    {
      id: 'executive',
      name: 'Executive',
      description: 'Sophisticated design for senior-level professionals',
      previewImage: 'https://placehold.co/600x800/2d3748/ffffff?text=Executive+Template',
      bestFor: 'Managers, Directors, Executives'
    },
    {
      id: 'creative',
      name: 'Creative',
      description: 'Modern design with visual elements for creative fields',
      previewImage: 'https://placehold.co/600x800/4a5568/ffffff?text=Creative+Template',
      bestFor: 'Designers, Artists, Marketers'
    }
  ];

  const handleSelectTemplate = (templateId) => {
    navigate('/resume/build', { state: { selectedTemplate: templateId } });
  };

  return (
    <div className="min-h-screen bg-base-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Choose Your Resume Template</h1>
          <p className="text-xl opacity-80 max-w-3xl mx-auto">
            Select a design that matches your industry and personal style
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {templates.map((template) => (
            <div key={template.id} className="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow">
              <figure className="px-4 pt-4">
                <img 
                  src={template.previewImage} 
                  alt={template.name} 
                  className="rounded-xl h-64 w-full object-cover"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{template.name}</h2>
                <p>{template.description}</p>
                <div className="badge badge-outline mt-2">{template.bestFor}</div>
                <div className="card-actions justify-end mt-4">
                  {template.id === 'modern' ? (
                    <button 
                      onClick={() => handleSelectTemplate(template.id)}
                      className="btn btn-primary btn-sm"
                    >
                      Use Template
                    </button>
                  ) : (
                    <span className="text-sm opacity-60 italic">Coming Soon</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link to="/resume" className="btn btn-ghost">
            ← Back to Resume Builder
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResumeTemplates;
