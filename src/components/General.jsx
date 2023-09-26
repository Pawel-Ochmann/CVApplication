import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

// eslint-disable-next-line react/prop-types
function General({activeDialog, setActiveDialog}) {
  const [values, setValues] = useState({
    nameValue: 'Name',
    telValue: '',
    emailValue: '',
    addressValue: './face.png',
  });
  const [inputValues, setInputValues] = useState({
    nameInput: '',
    telInput: '',
    emailInput: '',
    addressInput: '',
  });

  const fillInput = (e) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const openDialog = () => {
    setActiveDialog([true, false, false]);
  };

  const closeDialog = () => {
    setActiveDialog([false, false, false]);
  };

  const useSubmit = () => {
    closeDialog();
    setValues({
      ...values,
      nameValue: inputValues.nameInput,
      telValue: inputValues.telInput,
      emailValue: inputValues.emailInput,
      addressValue: inputValues.addressInput,
    });
  };

  return (
    <div className='general'>
      <h1>{values.nameValue}</h1>
      <p>Tel: {values.telValue}</p>
      <p>Email: {values.emailValue}</p>
      <img
        src={values.addressValue}
        alt="Sorry, we couldn't fetch your photo"
        className='personalPhoto'
      />
      <button onClick={openDialog}>
        <FontAwesomeIcon icon={faPenToSquare} />
      </button>
      <dialog open={activeDialog[0]}>
        <label>
          Fill your name:{' '}
          <input
            type='text'
            name='nameInput'
            value={inputValues.nameInput}
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
          />
        </label>
        <label>
          And Your Email:{' '}
          <input
            type='text'
            name='emailInput'
            value={inputValues.emailInput}
            onChange={fillInput}
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
        <button onClick={useSubmit}>Submit</button>
        <button onClick={closeDialog}>Close</button>
      </dialog>
    </div>
  );
}

export default General;
