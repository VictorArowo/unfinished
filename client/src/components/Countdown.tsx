import React, { useState, useEffect } from 'react';
import moment from 'moment';
import styled from 'styled-components';

const StyledDiv = styled.div`
  font-size: 100px;
  width: 600px;
  height: 180px;
  margin: 10px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  .vl {
    border-left: 6px solid black;
    height: 100px;
  }
  .number {
    padding: 30px;
  }

  .description {
    font-size: 16px;
  }
`;

interface Props {}

const Countdown: React.FC<Props> = props => {
  const [seconds, setSeconds] = useState('0');
  const [minutes, setMinutes] = useState('0');
  const [hours, setHours] = useState('0');

  useEffect(() => {
    const timer = setInterval(() => {
      const then = moment().endOf('day');
      const now = moment();
      const countdown = moment(+then - +now);
      const hours = countdown.format('HH');
      const minutes = countdown.format('mm');
      const seconds = countdown.format('ss');
      setHours(hours);
      setMinutes(minutes);
      setSeconds(seconds);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <h1>Time left to complete your tasks for the day</h1>
      <StyledDiv>
        <div className="number">
          <div>{hours}</div>
          <div className="description">HOURS</div>
        </div>
        <div className="vl"></div>
        <div className="number">
          <div>{minutes}</div>
          <div className="description">MINUTES</div>
        </div>
        <div className="vl"></div>
        <div className="number">
          <div>{seconds}</div>
          <div className="description">SECONDS</div>
        </div>
      </StyledDiv>
    </>
  );
};

export default Countdown;
