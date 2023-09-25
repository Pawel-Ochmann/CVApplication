import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useState, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

function Education({ activeDialog, setActiveDialog }) {
  const [schoolList, setSchoolList] = useState([]);
  const [inputValues, setInputValues] = useState({ name: '', years: '' });

  const openDialog = () => {
    setActiveDialog([false, true]);
  };

  const closeDialog = () => {
    setActiveDialog([false, false]);
  };

  const useSubmit = (e) => {
    const nameInput = nameRef.current;
    nameInput.setCustomValidity('');
    e.preventDefault();

    if (!nameInput.checkValidity()) {
      nameInput.setCustomValidity(
        'First we need the name of the school You graduated'
      );
      nameInput.reportValidity();
      return;
    }
    setSchoolList([
      ...schoolList,
      { id: uuidv4(), name: inputValues.name, years: inputValues.years },
    ]);
    setInputValues({ name: '', years: '' });
    closeDialog();
    console.log(schoolList);
  };

  const fillInput = (e) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const editSchool = () => {
    return true;
  };

  const deleteSchool = (schoolId) => {
    const newSchoolArray = [...schoolList].filter(school => school.id !== schoolId);
    setSchoolList(newSchoolArray);
  };

  const nameRef = useRef(null);

  return (
    <div className='education'>
      <table>
        <caption>Education</caption>
        <tr>
          <th>School</th>
          <th>Years</th>
        </tr>
        {schoolList.map((school) => {
          return (
            <tr key={school.id}>
              <td>{school.name}</td>
              <td>{school.years}</td>
            </tr>
          );
        })}
      </table>
      <button onClick={openDialog}>
        <FontAwesomeIcon icon={faPenToSquare} />
      </button>
      <dialog open={activeDialog[1]}>
        {schoolList.map((school) => {
          return (
            <div className='schoolBox' key={uuidv4()}>
              <input type='text' disabled value={school.name} />
              <input type='text' disabled value={school.years} />
              <button onClick={()=> {editSchool(school.id)}}>
                <FontAwesomeIcon icon={faPenToSquare} />
              </button>
              <button onClick={()=> deleteSchool(school.id)}>
                <FontAwesomeIcon icon={faTrash}/>
              </button>
            </div>
          );
        })}
        <div className='newSchool'>
          <label>
            Name of school: {''}
            <input
              type='text'
              name='name'
              ref={nameRef}
              value={inputValues.name}
              onChange={fillInput}
              required
            />
          </label>
          <label>
            Years: {''}
            <input
              type='text'
              name='years'
              value={inputValues.years}
              onChange={fillInput}
            />
          </label>
        </div>
        <button onClick={useSubmit}>Submit</button>
        <button onClick={closeDialog}>Close</button>
      </dialog>
    </div>
  );
}

export default Education;
