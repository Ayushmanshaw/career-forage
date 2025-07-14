import { Routes, Route } from "react-router-dom";
// import CoverLetter from "../features/cover_letter/CoverLetter.jsx";
// import ATSChecker from "../features/ats/ATSChecker.jsx";
// import PortfolioGen from "../features/portfolio/PortfolioGen.jsx";
import NotFound from "../pages/NotFound.jsx";
import About from "../pages/About.jsx";
import ContactUs from "../pages/ContactUs.jsx";
import Services from "../pages/Services.jsx"; 
import LandingPage from "../components/LandingPage.jsx";
import Resume from "../features/resume/Resume.jsx";
import LearnMore from "../pages/LearnMore.jsx";
import ResumeTemplates from "../components/Resume/ResumeTemplates.jsx";
import ResumePreview from "../components/Resume/ResumePreview.jsx";
import ResumeBuilderForm from "../components/Resume/ResumeBuilderForm.jsx";


export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/about" element={<About />} />
      <Route path="/home" element={<LandingPage />} />
      <Route path="/contactus" element={<ContactUs />} />
      <Route path="/services" element={<Services />} />
      <Route path="/resume" element={<Resume />} />
      <Route path="/resume/template" element={<ResumeTemplates />} />
      <Route path="/resume/build" element={<ResumeBuilderForm />} />
      <Route path="/resume/preview" element={<ResumePreview />} />
      {/* <Route path="/cover-letter" element={<CoverLetter />} />
      <Route path="/ats-score" element={<ATSChecker />} />
      <Route path="/portfolio" element={<PortfolioGen />} /> */}
      <Route path="/learn-more" element={<LearnMore />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}