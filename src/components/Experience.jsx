import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

// eslint-disable-next-line react/prop-types
function Experience({ activeDialog, setActiveDialog }) {
  const openDialog = () => {
    console.log('kurwaaaa');
    setActiveDialog([false, false, true]);
  };

  const closeDialog = () => {
    setActiveDialog([false, false, false]);
  };

  const emptyJob = { name: '', start: '', end: '', duties: '' };
  const [pendingJob, setPendingJob] = useState({ ...emptyJob });

  const fillPending = (e) => {
    const { name, value } = e.target;
    setPendingJob({ ...pendingJob, [name]: value });
  };


  return (
    <div className='experience'>
      <dialog open={activeDialog[2]}>
        <form action=''>
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
              required
              onChange={fillPending}
            />
          </label>
          <label>
            End:
            <input
              value={pendingJob.end}
              type='month'
              name='end'
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
            ></textarea>
          </label>
          <button type='submit'>Submit</button>
          <button onClick={closeDialog}>Close</button>
        </form>
      </dialog>
      <h3>Experience</h3>
      <button onClick={openDialog}>
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </div>
  );
}

export default Experience;
