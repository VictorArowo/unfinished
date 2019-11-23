import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { AppState } from '../state/store';

export const Div = styled.div`
  height: 90vh;
  width: 30vw;
  margin: 10px;
  border-radius: 10px;
  background-color: white;
`;

interface Props {}

const Sidebar: React.FC<Props> = () => {
  return <Div>Sidebar</Div>;
};

const mapStateToProps = (state: AppState) => ({
  messageVisibility: state.user
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar);
