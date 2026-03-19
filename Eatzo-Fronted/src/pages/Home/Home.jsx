import React,{useState} from 'react'
import HeroSection from './HeroSection'
import FeaturedFoods from './FeaturedFoods';
import ContactSection from './ContactSection';
import AboutSection from './AboutSection';
import './Home.css';

const Home = () => {

  //Selected category state
  const [selectedCategory, setSelectedCategory] 
    = useState("All")

  return (
    <div className="home">
      <HeroSection />
      <FeaturedFoods />
       <AboutSection />
       <ContactSection />
    </div>
  )
}

export default Home
