import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useState, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

// eslint-disable-next-line react/prop-types
function Skills({ activeDialog, setActiveDialog }) {
  const [pendingSkill, setPendingSkill] = useState('');
  const [skills, setSkills] = useState([
    { id: uuidv4(), skill: 'Driving license, category "B"' },
    { id: uuidv4(), skill: 'Fluent in Polish' },
    { id: uuidv4(), skill: 'Riding horses' },
  ]);

  const nameRef = useRef('');

  const openDialog = () => {
    setActiveDialog([false, false, false, true, false]);
  };

  const closeDialog = (e) => {
    e.preventDefault();
    setActiveDialog([false, false, false, false, false]);
  };

  const fillInput = (e) => {
    setPendingSkill(e.target.value);
  };

  const handleSubmit = (e) => {
    if (!nameRef.current.checkValidity()) {
      nameRef.current.reportValidity();
      return;
    }
    e.preventDefault();
    setSkills([...skills, { id: uuidv4(), skill: [pendingSkill] }]);
    setPendingSkill('');
  };

  const deleteSkill = (skillId) => {
    const newSkillArray = [...skills].filter((skill) => skill.id !== skillId);
    setSkills(newSkillArray);
  };

  return (
    <div className='skills'>
      <dialog open={activeDialog[3]}>
        <form ref={nameRef} action=''>
          <label>
            Add skill:{' '}
            <input
              type='text'
              value={pendingSkill}
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
      <h2>Skills</h2>
      <div className='skillsContainer'>
        {skills.map((skill) => {
          return (
            <ul className='skill' key={skill.id}>
              <li>{skill.skill}</li>
              <button className='change'>
                <FontAwesomeIcon
                  icon={faTrash}
                  onClick={() => {
                    deleteSkill(skill.id);
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

export default Skills;
