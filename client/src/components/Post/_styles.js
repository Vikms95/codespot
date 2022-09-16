import styled from "styled-components";

const StyledPost = styled.section`
	max-width: clamp(3em, 100vw, 80ch);
	margin: 0 5em 5em 5em;
	display: flex;
	flex-direction: column;
	align-items: center;
  justify-content: center;
  
  > p > pre  {
    display: flex;
    flex-wrap:wrap;
    background-color: black;
    color: white;
    padding: 1em;
    border-radius: 5px;
    overflow: hidden;
  }

  @media screen and(max-width:600px){
    margin-left:12em;
    margin-right: 0px;
  }
  `;


const CommentsTitle = styled.h1``;

const Title = styled.h2`
	font-size: clamp(16px, 5vw,4em);
  max-width: 80ch;
`;
const Image = styled.img`
	max-width: 100%;
	max-height: 100rem;
	align-self: center;
	margin-bottom: 3em;
`;

const Text = styled.p`
	font-size: clamp(16px, 2vw, 1.5em);
  max-width: clamp(18em, 65vw, 70ch);
	margin-bottom: 5em;
	display: flex;
	flex-direction: column;
	text-align: justify;
  `;

const LoginLinkText = styled.div`
	display: flex;
	column-gap: 2em;
	font-weight: 800;
`;

export { CommentsTitle,Image,LoginLinkText,StyledPost,Text,Title}