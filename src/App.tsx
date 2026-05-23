import Countdown from './components/Countdown';
import ChildhoodPhoto from './components/ChildhoodPhoto';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Invitation from './components/Invitation';
import Location from './components/Location';
import PaperHeart from './components/PaperHeart';
import RSVP from './components/RSVP';
import Schedule from './components/Schedule';

export default function App() {
  return (
    <>
      <Hero />
      <main>
        <Countdown />
        <ChildhoodPhoto />
        <Invitation />
        <PaperHeart />
        <Schedule />
        <Location />
        <RSVP />
      </main>
      <Footer />
    </>
  );
}
