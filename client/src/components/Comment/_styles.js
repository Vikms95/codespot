import styled from "styled-components";
import {FaTrash} from 'react-icons/fa'

const StyledComment = styled.article`
	display: flex;
	flex-direction: column;
	line-height: 22px;
	padding-left: 1.5em;
	width: 100%;
  margin-bottom: 5;

	margin-left: ${props => (props.isActive ? 'none' : '5em')};
	opacity: ${props => (props.isActive ? 1 : 0)};
	transition: margin-left .5s ease-out, opacity 1.5s;
`;

const Username = styled.div`
	color: #6649b8;
`;

const Text = styled.p``;

const IconsContainer = styled.div`
	display: flex;
	gap: 10px;
	padding-bottom: 1em;
`;

const IconButton = styled.button`
	border: none;
	background-color: transparent;
	color: #6649b8;
`;

const StyledFaTrash = styled(FaTrash)`
	color: red;
`;

const CommentBorder = styled.div`
	margin-bottom: 2em;
	border: 2px solid;
	border-image: linear-gradient(
			90deg,
			rgba(83, 65, 95, 0.9),
			rgba(60, 74, 83, 0)
		)
		1;
	border-left: none;
	border-top: none;
	border-right: none;
`;

const CollapseButton = styled.button`
	border: none;
	border-right: solid 5px white;
	border-left: solid 5px white;
	background-color: #6649b8;
	padding: 1.2px;

	&:hover {
		background-color: #a899d4;
	}
`;

const ExpandButton = styled.button`
	display: flex;
	gap: 5px;
	border: none;
	background-color: transparent;
	display: ${props => (props.areChildrenHidden ? 'flex' : 'none')};
`;


export {StyledComment, CommentBorder, IconButton, IconsContainer, Text , Username, StyledFaTrash, CollapseButton, ExpandButton }