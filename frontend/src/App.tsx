import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ShowCard from "./pages/ShowCard";
import Upgrade from "./pages/Upgrade";
import { Toaster } from "./components/ui/toaster";

const App = () => {
  return (
    <div>
      <Toaster />
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/showcard/:uuid" element={<ShowCard />} />
          <Route path="/upgrade" element={<Upgrade />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
