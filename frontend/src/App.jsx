import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CropDetails from "./pages/CropDetails";
const LandingPage = lazy(() => import('./pages/LandingPage'));
const Login = lazy(() => import('./pages/Login'));
const SignUp = lazy(() => import('./pages/SignUp'));
const Learn = lazy(() => import('./pages/Learn'));
const CustomerDashboard = lazy(() => import('./pages/CustomerDashboard'));
const About = lazy(() => import('./pages/About'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Planner = lazy(() => import('./pages/Planner'));
const Crops = lazy(() => import('./pages/Crops'));
const Market = lazy(() => import('./pages/Market'));
function App() {
  return (
    <Router>
      <Suspense fallback={<div className="text-center mt-10 text-lg text-green-600 font-semibold">Loading...</div>}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/customerdashboard" element={<CustomerDashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/planner" element={<Planner />} />
          <Route path="/crops" element={<Crops />} />
          <Route path="/market" element={<Market />} />
          <Route path="/crops/:cropId" element={<CropDetails />} />
          {/* Add more routes as needed */}
        </Routes>
      </Suspense>
      <ToastContainer />
    </Router>
  );
}

export default App;
