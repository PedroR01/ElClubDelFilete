import "./App.css";
import Navbar from "./components/Navbar";
import Section from "./components/Section";
import Footer from "./components/Footer";
import Slider from "./components/Slider";
import image1 from './img/logoIntro.png';
import image2 from './img/logoNavbar.png';

const images = [
  image1,
  image2,
];

function App() {
  
  return (
    <div className="App bg-[#8B2A1F]">
      <Navbar />
      <Section
        name="Club del Filete"
        description="Lorem ipsum dolor sit amet consectetur. Amet malesuada quis nunc fermentum. Condimentum a commodo fringilla sit gravida porta. Proin a bibendum fringilla sed sit cursus mi ac elit."
      />
      <Slider images={images}/>
      <Footer />
    </div>
  );
}

export default App;
