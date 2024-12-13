import { Route, Routes } from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"

const App = () => {
  return (
    <div>
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
