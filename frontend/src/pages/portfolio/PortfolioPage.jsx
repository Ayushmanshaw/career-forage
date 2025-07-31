import { useLocation } from "react-router-dom";
import QRCode from "react-qr-code";

const PortfolioPage = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const githubUrl = params.get("githubUrl");
  const vercelUrl = params.get("vercelUrl");

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-base-200 text-base-content">
      <div className="bg-base-100 rounded-2xl shadow-xl max-w-md w-full p-8 text-center">
        <h1 className="text-2xl font-bold text-primary mb-4">
          🎉 Portfolio Successfully Deployed!
        </h1>
        <p className="text-base mb-6">
          You can now view and share your portfolio using the links below. Scan the QR code to view it instantly on mobile 📱
        </p>

        <div className="flex justify-center mb-6">
          <div className="bg-white p-4 rounded-xl shadow-md">
            <QRCode value={vercelUrl || ""} size={160} />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-neutral"
          >
            🐱 View GitHub Repository
          </a>
          <a
            href={vercelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            🚀 Visit Live Portfolio
          </a>
        </div>
      </div>
    </div>
  );
};

export default PortfolioPage;
