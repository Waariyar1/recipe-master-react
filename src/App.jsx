import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ThemeProvider } from "./contexts/ThemeContext"
import { TranslateProvider } from "./contexts/TranslateContext"
import Navbar from "./components/layout/Navbar"
import Footer from "./components/layout/Footer"
import BackToTop from "./components/ui/BackToTop"
import Home from "./pages/Home"
import AllRecipes from "./pages/AllRecipes"
import Categories from "./pages/Categories"
import About from "./pages/About"
import Contact from "./pages/Contact"
import LoginModal from "./components/modals/LoginModal"
import "./styles/globals.css"

function App() {
  return (
    <ThemeProvider>
      <TranslateProvider>
        <Router>
          <div className="app">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/all-recipes" element={<AllRecipes />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
            <Footer />
            <BackToTop />
            <LoginModal />
          </div>
        </Router>
      </TranslateProvider>
    </ThemeProvider>
  )
}

export default App
