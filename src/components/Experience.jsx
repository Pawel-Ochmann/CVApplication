import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

// eslint-disable-next-line react/prop-types
function Experience({ activeDialog, setActiveDialog }) {
  const nameRef = useRef(null);

  const openDialog = () => {
    setActiveDialog([false, false, true, false, false]);
  };

  const closeDialog = (e) => {
    e.preventDefault();
    setActiveDialog([false, false, false, false, false]);
  };

  const [pendingJob, setPendingJob] = useState({
    name: '',
    start: '',
    end: '',
    duties: '',
    id: '',
  });

  const [jobs, setJobs] = useState([]);

  const date = new Date();
  let month = date.getMonth() + 1;
  if (month < 10) month = 0 + month.toString();
  const maxMonth = date.getFullYear() + '-' + month;

  const [minMonth, setMinMonth] = useState('');

  const fillPending = (e) => {
    const { name, value } = e.target;
    setPendingJob({ ...pendingJob, [name]: value });
  };

  const handleMinMonth = (e) => {
    setMinMonth(e.target.value);
  };

  const handleSubmit = (e) => {
    if (!nameRef.current.checkValidity()) {
      nameRef.current.reportValidity();
      return;
    }
    e.preventDefault();
    setJobs([
      ...jobs,
      { name: pendingJob.name, start: pendingJob.start, end: pendingJob.end, duties: pendingJob.duties, id: uuidv4() },
    ]);

    setPendingJob({
      name: '',
      start: '',
      end: '',
      duties: '',
      id: '',
    });
    closeDialog(e);
  };

  useEffect(() => {
    const dialogForm = document.querySelector('.experience form');
    const dialogInputs = dialogForm
      ? Array.from(dialogForm.querySelectorAll('input, textarea'))
      : [];

    if (activeDialog[2]) {
      dialogInputs.forEach((input) => {
        input.setAttribute('required', 'required');
      });
    } else {
      dialogInputs.forEach((input) => {
        input.removeAttribute('required');
      });
    }
  }, [activeDialog]);

  return (
    <div className='experience'>
      <dialog open={activeDialog[2]}>
        <form ref={nameRef} action=''>
          <label>
            Position: {''}
            <input
              value={pendingJob.name}
              type='text'
              name='name'
              required
              onChange={fillPending}
            />
          </label>
          <label>
            Start:
            <input
              value={pendingJob.start}
              type='month'
              name='start'
              max={maxMonth}
              required
              onChange={(e) => {
                fillPending(e);
                handleMinMonth(e);
              }}
            />
          </label>
          <label>
            End:
            <input
              value={pendingJob.end}
              type='month'
              name='end'
              max={maxMonth}
              min={minMonth}
              required
              onChange={fillPending}
            />
          </label>
          <label>
            Duties:{' '}
            <textarea
              value={pendingJob.duties}
              name='duties'
              id=''
              cols='30'
              rows='10'
              onChange={fillPending}
              required
            ></textarea>
          </label>
          <button type='submit' onClick={handleSubmit}>
            Submit
          </button>
          <button type='' onClick={closeDialog}>
            Close
          </button>
        </form>
      </dialog>
      <h3>Experience</h3>
      <div className="jobsContainer">
        {jobs.map((job)=> {
          return (
            <div className='job' key={job.id}>
              <h4>job.name</h4>
              <p>job.start</p>
              <p>jobs.end</p>
              <p>jobs.duties</p>
              <button>
                <FontAwesomeIcon icon={faPenToSquare} />
              </button>
              <button>
                <FontAwesomeIcon icon={faTrash} />
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

export default Experience;
