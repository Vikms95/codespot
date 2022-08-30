import styled from 'styled-components';

const AppContainer = styled.main`
	margin-top: 5em;
  margin-bottom: 5em;
  margin-left:12em;
	display: flex;
	width: 85%;
  transition: all 200ms;

  @media only screen and (max-width: 600px) {
    margin-left: 2em;
  }

`;
export default AppContainer;
