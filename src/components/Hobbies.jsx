import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useState, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

// eslint-disable-next-line react/prop-types
function Hobbies({ activeDialog, setActiveDialog }) {
  const [pendingHobbies, setPendingHobbies] = useState('');
  const [hobbies, setHobbies] = useState([
    { id: uuidv4(), hobby:'Photography' },
    { id: uuidv4(), hobby: 'Hiking' },
    { id: uuidv4(), hobby: 'Playing Chess' },
  ]);

  const nameRef = useRef('');

  const openDialog = () => {
    setActiveDialog([false, false, false, false, true]);
  };

  const closeDialog = (e) => {
    e.preventDefault();
    setActiveDialog([false, false, false, false, false]);
  };

  const fillInput = (e) => {
    setPendingHobbies(e.target.value);
  };

  const handleSubmit = (e) => {
    if (!nameRef.current.checkValidity()) {
      nameRef.current.reportValidity();
      return;
    }
    e.preventDefault();
    setHobbies([...hobbies, { id: uuidv4(), hobby: [pendingHobbies] }]);
    setPendingHobbies('');
  };

  const deleteHobby = (hobbyId) => {
    const newHobbyArray = [...hobbies].filter((hobby) => hobby.id !== hobbyId);
    setHobbies(newHobbyArray);
  };

  return (
    <div className='hobbies'>
      <dialog open={activeDialog[4]}>
        <form ref={nameRef} action=''>
          <label>
            Add hobby:{' '}
            <input
              type='text'
              value={pendingHobbies}
              onChange={fillInput}
              required
            />
          </label>
          <button type='submit' onClick={handleSubmit}>
            Submit
          </button>
          <button type='' onClick={closeDialog}>
            Close
          </button>
        </form>
      </dialog>
      <h2>Hobbies</h2>
      <div className='hobbiesContainer'>
        {hobbies.map((hobby) => {
          return (
            <ul className='hobby' key={hobby.id}>
              <li>{hobby.hobby}</li>
              <button className='change'>
                <FontAwesomeIcon
                  icon={faTrash}
                  onClick={() => {
                    deleteHobby(hobby.id);
                  }}
                />
              </button>
            </ul>
          );
        })}
      </div>
      <button className='change' onClick={openDialog}>
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </div>
  );
}

export default Hobbies;
