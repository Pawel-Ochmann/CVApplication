import { useState } from 'react';
import '../styles/main.scss';
import General from './General';
import Education from './Education';
import Experience from './Experience';

function Header() {
  return <h1>Create Your Personal CV!</h1>;
}

function Main() {
  const [activeDialog, setActiveDialog] = useState([false, false, false]);

  return (
    <main>
      <General activeDialog={activeDialog} setActiveDialog={setActiveDialog} />
      <Education
        activeDialog={activeDialog}
        setActiveDialog={setActiveDialog}
      />
      <Experience
        activeDialog={activeDialog}
        setActiveDialog={setActiveDialog}
      />
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
