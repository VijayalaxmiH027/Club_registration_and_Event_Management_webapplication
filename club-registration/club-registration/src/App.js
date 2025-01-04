import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Mediaclubs from './components/Mediaclubs';
import UpscClub from './components/UpscClub';
import WordsworthClub from './components/WordsworthClub';
import AerokleClub from './components/AerokleClub';
import NityotsavaClub from './components/NityotsavaClub';
import DramaClub from './components/DramaClub';
import DefenceClub from './components/DefenceClub';
import CodeClub from './components/CodeClub';
import EventCategories from './components/EventCategories';
import RegisterForm from './components/RegisterForm';
import RegistrationPage from './components/RegistrationPage';
import Homepage from './components/Homepage';
import ProfilePage from './components/ProfilePage';
import Settings from './components/Settings';
import FeedbackForm from './components/FeedbackForm';
import SignUpForm from './components/Signup';
import ConfirmationPage from './components/ConfirmationPage';
import Navbar from './components/Navbar';
import AboutUs from './components/AboutUs ';
import ContactUs from './components/ContactUs';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/feedback" element={<FeedbackForm/>} /> 
        <Route path='/media' element={<Mediaclubs/>}/>
        <Route path='/upsc' element={<UpscClub/>}/>
        <Route path='/wordsworth' element={<WordsworthClub/>}/>
        <Route path='/aerokle' element={<AerokleClub/>}/>
        <Route path='/nityotsava' element={<NityotsavaClub/>}/>
        <Route path='/drama' element={<DramaClub/>}/>
        <Route path='/defence' element={<DefenceClub/>}/>
        <Route path='/code' element={<CodeClub/>}/>
        <Route path='/events' element={<EventCategories/>}/>
        <Route path='/register' element={<RegisterForm/>}/>
        <Route path='/event-register' element={<RegistrationPage/>}/>
        <Route path='/confirmation' element={<ConfirmationPage/>}/>
        <Route path="/profile" element={<ProfilePage/>} />
        <Route path="/settings" element={<Settings/>} />
        <Route path="/about" element={<AboutUs/>} />
        <Route path="/contact" element={<ContactUs/>} />
        <Route path="/navbar" element={<Navbar/>} />
        <Route path='/homepage' element={<Homepage name={'upsc'}/>}/>
      </Routes>
    </Router>
  );
}

export default App;
