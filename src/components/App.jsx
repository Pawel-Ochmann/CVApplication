import { useState } from 'react';
import '../styles/main.scss';
import General from './General'

function Header() {
  return <h1>Create Your Personal CV!</h1>;
}

function Main() {
  return (
    <main>
      <General />
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
