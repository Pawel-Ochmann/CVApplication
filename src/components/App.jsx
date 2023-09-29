import { useState } from 'react';
import '../styles/main.scss';
import General from './General';
import Education from './Education';
import Experience from './Experience';
import Skills from './Skills';
import Hobbies from './Hobbies';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrint } from '@fortawesome/free-solid-svg-icons';

function Header() {
  const print = ()=> {
    window.print();
  }

  return (
    <header>
      <h1>Create Your Personal CV!</h1>
      <p>...and click <button onClick={print}><FontAwesomeIcon icon={faPrint}></FontAwesomeIcon></button> when it is ready.</p>
    </header>
  );
}

function Main() {
  const [activeDialog, setActiveDialog] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);

  return (
    <main>
      <General activeDialog={activeDialog} setActiveDialog={setActiveDialog} />
      <Experience
        activeDialog={activeDialog}
        setActiveDialog={setActiveDialog}
      />
      <Education
        activeDialog={activeDialog}
        setActiveDialog={setActiveDialog}
      />

      <Skills activeDialog={activeDialog} setActiveDialog={setActiveDialog} />
      <Hobbies activeDialog={activeDialog} setActiveDialog={setActiveDialog} />
    </main>
  );
}

function App() {
  return (
    <>
      <Header />
      <Main />
    </>
  );
}

export default App;
