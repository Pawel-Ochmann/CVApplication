import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { useState, useRef } from 'react';

// eslint-disable-next-line react/prop-types
function General({ activeDialog, setActiveDialog }) {
  const [values, setValues] = useState({
    nameValue: 'Jan Kowalski',
    telValue: '022-222-22-22',
    emailValue: 'kowalski@gmail.com',
    addressValue: './face.png',
    aboutMe:
      'I am a motivated and dedicated professional with a passion for programming. I am committed to achieving excellence in every project I undertake. Always cheerful and open to new experiences.',
  });
  const [inputValues, setInputValues] = useState({
    nameInput: 'Jan Kowalski',
    telInput: '022-222-22-22',
    emailInput: 'kowalski@gmail.com',
    addressInput: '',
    aboutMe:
      'I am a motivated and dedicated professional with a passion for programming. I am committed to achieving excellence in every project I undertake. Always cheerful and open to new experiences.',
  });

  const nameRef = useRef(null);

  const fillInput = (e) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const openDialog = () => {
    setActiveDialog([true, false, false]);
  };

  const closeDialog = (e) => {
    e.preventDefault();
    setActiveDialog([false, false, false]);
  };

  const useSubmit = (e) => {
    if (!nameRef.current.checkValidity()) {
      nameRef.current.reportValidity();
      return;
    }
    e.preventDefault();
    setValues({
      ...values,
      nameValue: inputValues.nameInput,
      telValue: inputValues.telInput,
      emailValue: inputValues.emailInput,
      addressValue: inputValues.addressInput,
      aboutMe: inputValues.aboutMe,
    });
    closeDialog(e);
  };

  return (
    <div className='general'>
      <h1>{values.nameValue}</h1>
      <img
        src={values.addressValue}
        alt="Sorry, we couldn't fetch your photo"
        className='personalPhoto'
      />
      <div className='generalBox'>
        <h2>Tel:</h2>
        <p>{values.telValue}</p>
        <h2>Email:</h2>
        <p>{values.emailValue}</p>
        <h2>About me: </h2>
        <p>{values.aboutMe}</p>
      </div>

      <button className='change' onClick={openDialog}>
        <FontAwesomeIcon icon={faPenToSquare} />
      </button>
      <dialog open={activeDialog[0]}>
        <form ref={nameRef}>
          <label>
            Fill your name:{' '}
            <input
              type='text'
              name='nameInput'
              value={inputValues.nameInput}
              onChange={fillInput}
              required
            />
          </label>
          <label>
            Your photo address:{' '}
            <input
              type='text'
              name='addressInput'
              value={inputValues.addressInput}
              onChange={fillInput}
            />
          </label>
          <label>
            Your telephone number:{' '}
            <input
              type='text'
              name='telInput'
              value={inputValues.telInput}
              onChange={fillInput}
              required
            />
          </label>
          <label>
            And Your Email:{' '}
            <input
              type='text'
              name='emailInput'
              value={inputValues.emailInput}
              onChange={fillInput}
              required
            />
          </label>
          <label className='textarea'>
            Tell us something about You:{' '}
            <textarea
              type='text'
              name='aboutMe'
              value={inputValues.aboutMe}
              onChange={fillInput}
              cols='30'
              rows='10'
              required
            ></textarea>
          </label>
          <button onClick={useSubmit}>Submit</button>
          <button onClick={closeDialog}>Close</button>
        </form>
      </dialog>
    </div>
  );
}

export default General;
