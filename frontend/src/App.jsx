import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
const LandingPage = lazy(() => import('./pages/LandingPage'));
const Login = lazy(() => import('./pages/Login'));
const SignUp = lazy(() => import('./pages/SignUp'));
const Learn = lazy(() => import('./pages/Learn'));
const CustomerDashboard = lazy(() => import('./pages/CustomerDashboard'));
const FarmerDashboard = lazy(() => import('./pages/FarmerDashboard'));
const About = lazy(() => import('./pages/About'));
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
          <Route path="/farmerdashboard" element={<FarmerDashboard />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
