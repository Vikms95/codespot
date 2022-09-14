import styled from 'styled-components';
import { Button } from '../../style/Button';
import { Label } from '../../style/Label';
import { FaCheck } from 'react-icons/fa';

const UserFormContainer = styled.section`
	border-radius: 10px;
	box-shadow: 21px 2px 48px -1px rgba(0, 0, 0, 0.09);
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	min-height: 60%;
	max-width: 100%;
	padding: 2em max(3em, 4vw);
  margin-left: max(10em, 5vw);
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

	background-color: ${props => props.disabled && 'grey'};
	color: ${props => props.disabled && 'white'};
	&:hover {
		${props => props.disabled && 'filter: none; cursor:default;'}
	}
`;

const InputHeader = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
`;

const ErrorMessage = styled.div`
	opacity: ${props => (props.shouldMarkError ? '1' : '0')};
	color: red;
	transition: opacity 0.5s ease-out;
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
`;

const FormImage = styled.img`
	height: max(20em, 30vw);
	width: auto;
  margin-right: max(5vw, 5rem);

  @media screen and (max-width: 1050px) {
    display: none;
}
`;

const PostFormContainer = styled.section`
	margin: 0 5em;
	display: flex;
	justify-content: center;
	align-items: center;
	min-width: 100%;

	opacity: ${props => (props.isActive ? 1 : 0)};
	transition: opacity 1s;
`;

const StyledPostForm = styled.form`
	display: grid;
	grid-template-rows: 1fr 1fr 1fr 1fr;
`;

const TitleInput = styled.input`
	padding: 0.5em;
	border-radius: 10px;
	border: solid 1px rgba(88, 87, 87, 0.2);
	width: 20em;
`;

const FormBottomRow = styled.article`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const InputContainer = styled.div`
	display: flex;
	flex-direction: row;
	gap: 5px;
`;

const ImageName = styled.div``;

const CheckBoxContainer = styled.div`
	position: relative;
	align-self: flex-start;
	margin-top: 0.2em;
`;

const CheckBoxTitle = styled.div`
	display: flex;
	align-items: center;
	margin-right: 5px;
`;

const CheckBoxLabel = styled.label`
	position: absolute;
	top: 0;
	left: 0;
	width: 42px;
	height: 26px;
	border-radius: 15px;
	background: #bebebe;
	cursor: pointer;

	&::after {
		content: '';
		display: block;
		border-radius: 50%;
		width: 18px;
		height: 18px;
		margin: 3px;
		background: #ffffff;
		box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
		transition: 0.2s;
	}
`;
const CheckBox = styled.input`
	position: absolute;
	opacity: 0;
	z-index: 1;
	border-radius: 15px;
	width: 42px;
	height: 26px;
	&:checked + ${CheckBoxLabel} {
		background: #6649b8;
		&::after {
			content: '';
			display: block;
			border-radius: 50%;
			width: 18px;
			height: 18px;
			margin-left: 21px;
			transition: 0.2s;
		}
	}
`;

const FormButton = styled(Button)`
	width: 10em;
	margin-left: 4em;

  background-color: ${props => props.disabled && 'grey'};
	color: ${props => props.disabled && 'white'};
	&:hover {
		${props => props.disabled && 'filter: none; cursor:default;'}
  }
`;

const BottomRight = styled.div`
	display: flex;
	justify-content: flex-end;
`;

const StyledFaCheck = styled(FaCheck)`
	color: green;
`;

const ServerErrorDisplay = styled.div`
  color: red;
  opacity: ${props => props.serverError ? '1': '0'};
  transition: opacity 1s ease-out;
`

export {
	FormImage,
	FormBottomRow,
	CheckBoxContainer,
	InputContainer,
	HeroTitle,
	Input,
	InputHeader,
	ErrorMessage,
	LoginButton,
	StyledLabel,
	UserFormContainer,
	UserForm,
	PostFormContainer,
	StyledPostForm,
	TitleInput,
	StyledFaCheck,
	BottomRight,
	CheckBoxTitle,
	CheckBox,
	CheckBoxLabel,
	FormButton,
  ServerErrorDisplay
};
