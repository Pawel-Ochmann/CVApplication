import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPenToSquare,
  faTrash,
  faPlus,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';
import { useState, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

// eslint-disable-next-line react/prop-types
function Education({ activeDialog, setActiveDialog }) {
  const date = new Date();
  let month = date.getMonth() + 1;
  if (month < 10) month = 0 + month.toString();
  const maxMonth = date.getFullYear() + '-' + month;

  const [minMonth, setMinMonth] = useState('');
  const [pendingSchools, setPendingSchools] = useState([
    {
      id: '1',
      name: 'University Name',
      startYear: '2019-09',
      endYear: '2023-06',
      readOnly: true,
    },
    {
      id: '2',
      name: 'High School Name',
      startYear: '2015-09',
      endYear: '2019-06',
      readOnly: true,
    },
  ]);
  const [schoolList, setSchoolList] = useState([
    {
      id: '1',
      name: 'University Name',
      startYear: '2019-09',
      endYear: '2023-06',
      readOnly: true,
    },
    {
      id: '2',
      name: 'High School Name',
      startYear: '2015-09',
      endYear: '2019-06',
      readOnly: true,
    },
  ]);
  const [inputValues, setInputValues] = useState({
    name: '',
    startYear: '',
    endYear: '',
  });

  const [editActive, setEditActive] = useState(0);

  const openDialog = () => {
    setActiveDialog([false, true, false, false, false]);
  };

  const closeDialog = () => {
    setMinMonth('');
    setActiveDialog([false, false, false, false, false]);
  };

  const useSubmit = (e) => {
    e.preventDefault();

    setSchoolList(sortSchools(pendingSchools));

    setInputValues({ name: '', startYear: '', endYear: '' });
    closeDialog();
  };

  const fillInput = (e) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const handleMinMonth = (e) => {
    setMinMonth(e.target.value);
  };

  const editSchoolStart = (schoolId) => {
    const schoolIndex = pendingSchools.findIndex((e) => {
      return e.id === schoolId;
    });
    const updatedSchool = { ...pendingSchools[schoolIndex], readOnly: false };
    const updatedSchoolList = [...pendingSchools];
    updatedSchoolList[schoolIndex] = updatedSchool;
    setPendingSchools(updatedSchoolList);
    setEditActive(schoolId);
  };
  const editSchoolEnd = (schoolId) => {
    const schoolIndex = pendingSchools.findIndex((e) => {
      return e.id === schoolId;
    });
    const updatedSchool = { ...pendingSchools[schoolIndex], readOnly: true };
    const updatedSchoolList = [...pendingSchools];
    updatedSchoolList[schoolIndex] = updatedSchool;
    setPendingSchools(updatedSchoolList);
    setEditActive(0);
    console.log('edit End');
  };

  const editSchool = (schoolId) => {
    console.log(schoolId, editActive);
    editActive === schoolId
      ? editSchoolEnd(schoolId)
      : editSchoolStart(schoolId);
  };

  const deleteSchool = (schoolId) => {
    const newSchoolArray = [...pendingSchools].filter(
      (school) => school.id !== schoolId
    );
    setPendingSchools(newSchoolArray);
  };

  const addSchool = () => {
    const nameInput = nameRef.current;
    nameInput.setCustomValidity('');
    if (!nameInput.checkValidity()) {
      nameInput.setCustomValidity(
        'First we need the name of the school You graduated'
      );
      nameInput.reportValidity();
      return;
    }
    setMinMonth('');

    setPendingSchools([
      ...pendingSchools,
      {
        id: uuidv4(),
        name: inputValues.name,
        startYear: inputValues.startYear,
        endYear: inputValues.endYear,
        readOnly: true,
      },
    ]);
    setInputValues({ name: '', startYear: '', endYear: '' });
  };

  const fillSchoolInput = (e, schoolId) => {
    const { name, value } = e.target;
    const schoolIndex = pendingSchools.findIndex((e) => {
      return e.id === schoolId;
    });
    const updatedSchool = {
      ...pendingSchools[schoolIndex],
      [name]: value,
    };
    const updatedSchoolList = [...pendingSchools];
    updatedSchoolList[schoolIndex] = updatedSchool;
    setPendingSchools(updatedSchoolList);
  };

  const sortSchools = (schoolsArray) => {
    const schoolsSorted = [...schoolsArray].sort((schoolA, schoolB) => {
      const endDateA = new Date(schoolA.endYear);
      const endDateB = new Date(schoolB.endYear);

      // Compare the end dates in descending order
      if (endDateA < endDateB) {
        return 1;
      } else if (endDateA > endDateB) {
        return -1;
      } else {
        return 0;
      }
    });
    return schoolsSorted;
  };

  const nameRef = useRef(null);

  return (
    <div className='education'>
      <h2>Education</h2>
      {schoolList.map((school) => {
        return (
          <div className='school' key={school.id}>
            <p>{school.name}</p>
            <p>
              {school.startYear} - {school.endYear}
            </p>
          </div>
        );
      })}
      <button className='change' onClick={openDialog}>
        <FontAwesomeIcon icon={faPenToSquare} />
      </button>
      <dialog className='dialogEducation' open={activeDialog[1]}>
        {pendingSchools.map((school) => {
          return (
            <div className='schoolBox' key={school.id}>
              <input
                key={school.id}
                name='name'
                type='text'
                readOnly={school.readOnly}
                value={school.name}
                onChange={(e) => {
                  fillSchoolInput(e, school.id);
                }}
              />
              <label>
                Started:{' '}
                <input
                  key={school.id}
                  name='startYear'
                  type='month'
                  max={maxMonth}
                  readOnly={school.readOnly}
                  value={school.startYear}
                  onChange={(e) => {
                    fillSchoolInput(e, school.id);
                    handleMinMonth(e);
                  }}
                />
              </label>
              <label>
                Finished:{' '}
                <input
                  key={school.id}
                  name='endYear'
                  type='month'
                  max={maxMonth}
                  readOnly={school.readOnly}
                  value={school.endYear}
                  onChange={(e) => {
                    fillSchoolInput(e, school.id);
                  }}
                />
              </label>
              <button
                onClick={() => {
                  editSchool(school.id);
                }}
              >
                <FontAwesomeIcon
                  icon={editActive === school.id ? faCheck : faPenToSquare}
                  onClick={() => {
                    editSchool(school.id);
                  }}
                />
              </button>
              <button onClick={() => deleteSchool(school.id)}>
                <FontAwesomeIcon icon={faTrash} />
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
            Commencement:
            <input
              type='month'
              max={maxMonth}
              name='startYear'
              value={inputValues.startYear}
              onChange={(e) => {
                fillInput(e), handleMinMonth(e);
              }}
            />
          </label>
          <label>
            Graduation:
            <input
              type='month'
              max={maxMonth}
              min={minMonth}
              name='endYear'
              value={inputValues.endYear}
              onChange={fillInput}
            />
          </label>
          <button>
            <FontAwesomeIcon icon={faPlus} onClick={addSchool} />
          </button>
        </div>
        <button onClick={useSubmit}>Submit</button>
        <button onClick={closeDialog}>Close</button>
      </dialog>
    </div>
  );
}

export default Education;
