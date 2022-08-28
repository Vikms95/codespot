/* eslint-disable react/prop-types */
import React, { useContext, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import axios from 'axios';
import styled from 'styled-components';
import { Editor } from '@tinymce/tinymce-react';
import { parseEditorData } from '../services/parseEditorData';
import { usePostToUpdate } from '../hooks/usePostToUpdate';
import { Label } from '../style/Label';
import { Button } from '../style/Button';
import { getCurrentDate } from '../services/getCurrentDate';
import { createFormData } from '../services/createFormData';
import { usePostsContext } from '../context/PostsContext';
import { usePostForm } from '../hooks/usePostForm';
import { postFields } from '../services/formFields';

const PostFormContainer = styled.section`
	margin: 5em;
	display: flex;
	justify-content: center;
	align-items: center;
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
	justify-content: space-evenly;
	align-items: center;
`;

const CheckBoxContainer = styled.div`
	position: relative;
	align-self: flex-start;
	margin-top: 0.2em;
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
		background: #531753;
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
	margin-left: 13em;
`;

function PostForm() {
	const navigate = useNavigate();
	const { postid } = useParams();
	const { posts } = usePostsContext();
	const { user } = useContext(AuthContext);
	const editorRef = useRef(null);

	const {
		formData,
		setFormData,
		handleChange,
		handleImageChange,
		handleEditorChange,
		handlePrivacyChange,
	} = usePostForm(editorRef, postFields);
	const { title, text, isPublic, image } = formData;

	usePostToUpdate(postid, posts, setFormData);

	const handleCreateSubmit = e => {
		e.preventDefault();

		const timestamp = getCurrentDate();
		const formDataRequest = createFormData({
			title,
			text,
			isPublic,
			user,
			image,
			timestamp,
		});
		axios
			.post('http://localhost:4000/api/post', formDataRequest, {})
			.then(res => console.log(res));

		return navigate('/dashboard');
	};

	const handleUpdateSubmit = async e => {
		e.preventDefault();

		const formDataRequest = createFormData({
			title,
			text,
			isPublic,
			user,
			image,
			formerTimestamp: formData.timestamp,
		});

		axios
			.put('http://localhost:4000/api/posts/' + postid, formDataRequest, {})
			.then(res => console.log(res));

		return navigate('/dashboard');
	};

	return (
		<PostFormContainer>
			<StyledPostForm
				onSubmit={postid ? handleUpdateSubmit : handleCreateSubmit}
				encType='multipart/form-data'
			>
				<Label htmlFor='title'>Title </Label>
				<TitleInput
					type='text'
					name='title'
					onChange={handleChange}
					placeholder='Post title ...'
					value={title}
					maxLength='40'
				/>
				<br />

				<Label htmlFor='text'>Post </Label>
				<Editor
					onInit={(_e, editor) => (editorRef.current = editor)}
					init={{
						height: 500,
						width: 800,
						menubar: false,
						elementpath: false,
					}}
					apiKey='k1kgs8qmzd0isvug3s4btubgrps7yutyhiy7jbsi038go8sq'
					name='html'
					value={formData.text}
					onEditorChange={(content, editor) => {
						handleEditorChange(parseEditorData(content, editor));
					}}
				/>

				<br />
				<FormBottomRow>
					<Label htmlFor='image'></Label>
					<input type='file' name='image' onChange={handleImageChange} />
					<br />

					<div>Publish this post</div>
					<CheckBoxContainer>
						<CheckBox
							type='checkbox'
							name='privacy'
							onChange={handlePrivacyChange}
							checked={isPublic}
						/>
						<CheckBoxLabel htmlFor='privacy'></CheckBoxLabel>
					</CheckBoxContainer>
					<br />

					<FormButton type='submit'>
						{postid ? 'Update post' : 'Submit post'}
					</FormButton>
				</FormBottomRow>
			</StyledPostForm>
		</PostFormContainer>
	);
}

export default PostForm;
