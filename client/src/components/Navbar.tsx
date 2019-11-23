import React from 'react';
import styled from 'styled-components';

const StyledNavBar = styled.div`
  display: flex;
  height: 7vh;
  background-color: #364456;
`;

interface Props {}

const Navbar: React.FC<Props> = () => {
  return <StyledNavBar>Navbar</StyledNavBar>;
};

export default Navbar;
