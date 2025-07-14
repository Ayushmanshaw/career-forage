import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage.jsx';
import Layout from './Layout.jsx';  // Import Layout
import './app.css';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Services from './pages/Services.jsx';
import ResumeLandingPage from './pages/resume/ResumeLandingPage.jsx';
import ResumeTemplates from './pages/resume/ResumeTemplate.jsx';
import ResumeBuilderForm from './pages/resume/ResumeForm.jsx';
import ResumePreview from './pages/resume/ResumePreview.jsx';
import Dashboard from './pages/Dashboard/Dashboard.jsx';

function App() {
  return (
    <>
      <Routes>
        {/* Main layout route */}
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="home" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="services" element={<Services />} />
          <Route path="resume" element={<ResumeLandingPage />} />
          <Route path="resume/template" element={<ResumeTemplates />} />
          <Route path="/resume/form" element={<ResumeBuilderForm />} />
          <Route path="/resume/preview" element={<ResumePreview />} />

        </Route>
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
