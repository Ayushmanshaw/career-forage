import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";  // Your Navbar component
import Footer from "./components/Footer";  // Your Footer component

const Layout = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet /> {/* Renders the child route */}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
