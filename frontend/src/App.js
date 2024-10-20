import logo from './logo.svg';
import './App.css';
import { Button } from './components/Button';
import { Section } from './components/Section';
import { Footer } from './components/Footer';

function App() {
  return (

    <div className="App">
      <Section 
      name="Club del Filete"
      description="Lorem ipsum dolor sit amet consectetur. Amet malesuada quis nunc fermentum. Condimentum a commodo fringilla sit gravida porta. Proin a bibendum fringilla sed sit cursus mi ac elit."
      />
      <Footer/>
    </div>
  );
}

export default App;
