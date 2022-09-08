/* eslint-disable react/prop-types */
import React, { useContext, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import styled from 'styled-components';
import { Editor } from '@tinymce/tinymce-react';
import { parseEditorData } from '../../utils/parseEditorData';
import { usePostToUpdate } from '../../hooks/usePostToUpdate';
import { Label } from '../../style/Label';
import { Button } from '../../style/Button';
import { createFormData } from '../../utils/createFormData';
import { usePostsContext } from '../../context/PostsContext';
import { usePostForm } from '../../hooks/usePostForm';
import { postFields } from '../../data/formFields';
import { createPost, updatePost } from '../../services/post';
import { FaCheck } from 'react-icons/fa';
import { useFadeIn } from '../../hooks/useFadeIn';

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
`;

const BottomRight = styled.div`
	display: flex;
	justify-content: flex-end;
`;

const StyledFaCheck = styled(FaCheck)`
	color: green;
`;

export function PostForm() {
	const navigate = useNavigate();
	const { postid } = useParams();
	const { posts } = usePostsContext();
	const { user } = useContext(AuthContext);
	const editorRef = useRef(null);
	const isActive = useFadeIn();

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

		const formDataRequest = createFormData({
			title,
			text,
			isPublic,
			user,
			image,
		});

		createPost(formDataRequest);

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

		updatePost(postid, formDataRequest);

		return navigate('/dashboard');
	};

	return (
		<PostFormContainer isActive={isActive}>
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
						height: 600,
						width: 1200,
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
					<InputContainer>
						<Label htmlFor='image'>Attach an image</Label>
						<input
							style={{ display: 'none' }}
							type='file'
							name='image'
							id='image'
							onChange={handleImageChange}
						/>
						{image && <StyledFaCheck></StyledFaCheck>}
					</InputContainer>
					<br />
					<BottomRight>
						<CheckBoxTitle>Make this post public</CheckBoxTitle>
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
					</BottomRight>
				</FormBottomRow>
			</StyledPostForm>
		</PostFormContainer>
	);
}
