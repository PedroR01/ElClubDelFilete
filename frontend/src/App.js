import "./App.css";
import Navbar from "./components/Navbar";
import Section from "./components/Section";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App bg-[#8B2A1F]">
      <Navbar />
      <Section
        name="Club del Filete"
        description="Lorem ipsum dolor sit amet consectetur. Amet malesuada quis nunc fermentum. Condimentum a commodo fringilla sit gravida porta. Proin a bibendum fringilla sed sit cursus mi ac elit."
      />
      <Footer />
    </div>
  );
}

export default App;
