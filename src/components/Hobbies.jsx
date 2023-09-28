import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useState, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

// eslint-disable-next-line react/prop-types
function Hobbies({ activeDialog, setActiveDialog }) {
  const [pendingHobbies, setPendingHobbies] = useState('');
  const [hobbies, setHobbies] = useState([]);

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
    console.log('...deleting')
    const newHobbyArray = [...hobbies].filter((hobby) => hobby.id !== hobbyId);
    setHobbies(newHobbyArray);
  };

  return (
    <div className='Hobbies'>
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
      <h3>Hobbies</h3>
      <div className='hobbiesContainer'>
        {hobbies.map((hobby) => {
          return (
            <div className='skill' key={hobby.id}>
              <p>{hobby.hobby}</p>
              <button>
                <FontAwesomeIcon
                  icon={faTrash}
                  onClick={() => {
                    deleteHobby(hobby.id);
                  }}
                />
              </button>
            </div>
          );
        })}
      </div>
      <button onClick={openDialog}>
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </div>
  );
}

export default Hobbies;
