import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import Login from "./pages/Login";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Assistant from "./pages/Assistant";
import MyAppointments from "./pages/MyAppointments";
import MyProfile from "./pages/MyProfile";
import Navbar from "./components/Navbar";
import Appointment from "./pages/Appointment";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import Curanet from "./pages/Curanet";
import HealthEducation from "./pages/HealthEducation";
import Sponsors from "./pages/Sponsors";
import EHRIntegration from "./pages/EHRIntegration";
import HealthAccess from "./pages/HealthAccess";
import EyeDiseaseDetection from "./pages/EyeDiseaseDetection";
import SpecialityDoctors from "./pages/SpecialityDoctors";

function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden px-3 py-4 sm:px-6 sm:py-8">
      <div className="pointer-events-none absolute -left-20 top-20 h-56 w-56 rounded-full bg-sky-200/70 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-cyan-100/70 blur-3xl" />

      <div className="app-shell relative z-10 mx-auto max-w-[1280px] px-4 py-3 sm:px-8 sm:py-6">
        <Toaster />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/doctors" element={<Doctors />}></Route>
          <Route path="/doctors/:speciality" element={<Doctors />}></Route>
          <Route path="/specialists/:specialitySlug" element={<SpecialityDoctors />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/healthaccess" element={<HealthAccess />}></Route>
          <Route path="/curanet" element={<Curanet />}></Route>
          <Route path="/ehr" element={<EHRIntegration />}></Route>
          <Route path="/sponsors" element={<Sponsors />}></Route>
          <Route path="/healtheducation" element={<HealthEducation />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/my-profile" element={<MyProfile />}></Route>
          <Route path="/my-appointment" element={<MyAppointments />}></Route>
          <Route path="/appointment/:docId" element={<Appointment />}></Route>
          <Route
            path="/eyediseasedetection"
            element={<EyeDiseaseDetection />}
          ></Route>
        </Routes>
        <Footer />
      </div>
    </div>
  );
}

export default App;
