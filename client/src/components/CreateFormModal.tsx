import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Button from './Button';
import styled from 'styled-components';
import { addTask } from '../state/actions/taskActions';
import { connect } from 'react-redux';
import { AppState } from '../state/store';

const Div = styled.div`
  .modal-area {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
    transform: translateZ(0);
    background-color: rgba(0, 0, 0, 0.5);
  }

  ._modal-close {
    position: absolute;
    top: 0;
    right: 0;
    padding: 0.5em;
    line-height: 1;
    background: #f6f6f7;
    border: 0;
    box-shadow: 0;
    cursor: pointer;
  }

  ._hide-visual {
    border: 0 !important;
    clip: rect(0 0 0 0) !important;
    height: 1px !important;
    margin: -1px !important;
    overflow: hidden !important;
    padding: 0 !important;
    position: absolute !important;
    width: 1px !important;
    white-space: nowrap !important;
  }

  ._modal-close-icon {
    width: 25px;
    height: 25px;
    fill: transparent;
    stroke: black;
    stroke-linecap: round;
    stroke-width: 2;
  }

  .modal-body {
    padding-top: 0.25em;
    margin: auto;
    margin-top: 20vh;
    background: white;
    width: 30%;
    height: 30%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

interface Task {
  title: String;
  priority: String;
}

interface Props {
  addTask?: any;
}

const CreateFormModal: React.FC<Props> = ({ addTask }) => {
  const [showModal, toggleModal] = useState(false);
  const [formValues, setFormValues] = useState({
    title: '',
    priority: 'low'
  });

  const handleChange = (event: any) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
  };

  const handleSubmit = () => {
    addTask && addTask(formValues);
    toggleModal(false);
  };

  return (
    <>
      <Button handleClick={() => toggleModal(!showModal)} />
      {showModal &&
        ReactDOM.createPortal(
          <Div>
            <div className="modal-area">
              <button
                className="_modal-close"
                onClick={() => toggleModal(!showModal)}
              >
                <span className="_hide-visual">Close</span>
                <svg className="_modal-close-icon" viewBox="0 0 40 40">
                  <path d="M 10,10 L 30,30 M 30,10 L 10,30" />
                </svg>
              </button>

              <div className="modal-body">
                <input
                  type="text"
                  placeholder="Title"
                  name="title"
                  onChange={e => handleChange(e)}
                  value={formValues.title}
                />
                <label>
                  Priority:
                  <select
                    name="priority"
                    onChange={handleChange}
                    value={formValues.priority}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </label>

                <button onClick={handleSubmit}>Add</button>
              </div>
            </div>
          </Div>,
          document.body
        )}
    </>
  );
};

const mapActionToProps = {
  addTask
};

export default connect(null, { addTask })(CreateFormModal);
