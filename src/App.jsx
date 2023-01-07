import  { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home"
import { Company } from "./pages/Company"
import { Contact } from "./pages/Contact"
import { NewProject } from "./pages/NewProject"
import { NavBar } from "./components/Layout/NavBar";
import { Container } from "./components/Layout/Container";
import { Footer } from "./components/Layout/Footer";
import { Projects } from "./pages/Projects";
import { Project } from "./pages/Project";

function App() {

  return (
    <Router>
      <NavBar />
      <Container customClass="min-height">
        <Routes>
          <Route path='/' element={ <Home /> } />
          <Route path='/projects' element={ <Projects /> } />
          <Route path='/company' element={ <Company /> } />
          <Route path='/contact' element={ <Contact /> } />
          <Route path='/newproject' element={ <NewProject /> } />
          <Route path='/project/:id' element={ <Project /> } />
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
}

export default App
