import React, {PropTypes} from 'react';
import {default as ReactModal} from 'react-modal';
import {
  newDuckTop, pointer, newDuckInputContainer,
  newDuckInput, submitDuckBtn, darkBtn } from './styles.css';

const modalStyles = {
  content: {
    width: 350,
    margin: '0 auto',
    height: 220,
    borderRadius: 5,
    background: '#EBEBEB',
    padding: 0
  }
};

const Modal = (props) => {
  function submitDuck() {
    console.log('Duck', props.duckText);
    console.log('User', props.user);
  }

  return (
    <span className={darkBtn} onClick={props.openModal}>
      {'Duck'}
      <ReactModal style={modalStyles} isOpen={props.isOpen} onRequestClose={props.closeModal}
        contentLabel='Compose new Duck'>
        <div className={newDuckTop}>
          <span>{'Compose new Duck'}</span>
          <span onClick={props.closeModal} className={pointer}>{'X'}</span>
        </div>
        <div className={newDuckInputContainer}>
          <textarea value={props.duckText} maxLength={140} type='text'
            onChange={(e) => props.updateDuckText(e.target.value)}
            className={newDuckInput}
            placeholder="What's on your mind?"/>
        </div>
        <button className={submitDuckBtn} onClick={submitDuck}
          disabled={props.isSubmitDisabled}>{'Duck'}</button>
      </ReactModal>
    </span>
  );
};

Modal.propTypes = {
  duckText: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  isSubmitDisabled: PropTypes.bool.isRequired,
  openModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  updateDuckText: PropTypes.func.isRequired
};

export default Modal;
