import styled from "styled-components";
import {Button} from '../../style/Button'
import {Label} from '../../style/Label'

const UserFormContainer = styled.section`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
box-shadow: 21px 2px 48px -1px rgba(0, 0, 0, 0.09);
height: 60%;
width: 100%;
padding: 3em 10em;
border-radius: 10px;
`;

const UserForm = styled.form`
display: flex;
flex-direction: column;
justify-content: center;
gap: 1em;
align-items: center;
`;

const HeroTitle = styled.h1`
font-weight: 100;
font-size: 2em;
`;

const StyledLabel = styled(Label)`
align-self: flex-start;
font-weight: 400;
`;

const LoginButton = styled(Button)`
padding: 0.8em 4em;
font-weight: bolder;
margin-top: 2em;

background-color: ${props => props.disabled && 'grey'};
color: ${props => props.disabled && 'white'};
&:hover {
  ${props => props.disabled && 'filter: none; cursor:default;'}
}
`;

const Input = styled.input`
background-color: #f5f1f1;
box-shadow: inset 10 0 2px #000;
border: none;
border-radius: 5px;
font-size: 1.2em;
text-align: center;
padding: 0.6em 6em;

outline: ${props =>
  props.shouldMarkError ? '1.5px solid red' : '1px solid transparent'};

&:focus {
  outline: 1px solid #6649b8;
}

&:blur {
}
`;

const FormImage = styled.img`
height: max(20em, 30vw);
width: auto;
`;

export {FormImage,HeroTitle,Input, LoginButton, StyledLabel, UserFormContainer, UserForm }