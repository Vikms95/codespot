/* eslint-disable react/prop-types */
import React, { useContext, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { Editor } from '@tinymce/tinymce-react';
import { parseEditorData } from '../../utils/parseEditorData';
import { usePostToUpdate } from '../../hooks/usePostToUpdate';
import { Label } from '../../style/Label';
import { createFormData } from '../../utils/createFormData';
import { usePostsContext } from '../../context/PostsContext';
import { usePostForm } from '../../hooks/usePostForm';
import { postFields } from '../../data/formFields';
import { createPost, updatePost } from '../../services/post';
import { useFadeIn } from '../../hooks/useFadeIn';
import { useValidation } from '../../hooks/useValidation';
import { postVal } from '../../data/validationValues';
import {
	PostFormContainer,
	StyledPostForm,
	TitleInput,
	FormBottomRow,
	StyledFaCheck,
	InputContainer,
	BottomRight,
	CheckBoxContainer,
	CheckBoxTitle,
	CheckBoxLabel,
	CheckBox,
	FormButton,
	ErrorMessage,
} from './_style';

export function PostForm(props) {
	const { setPosts } = props;
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
	const { isFormValid, shouldMarkErr } = useValidation(postVal, formData);
	usePostToUpdate(postid, posts, setFormData);

	const handleCreateSubmit = async e => {
		e.preventDefault();

		const formDataRequest = createFormData({
			title,
			text,
			isPublic,
			user,
			image,
		});

		const post = await createPost(formDataRequest);
		if (!post) return;

		setPosts(prevPosts => [...prevPosts, post]);

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

		const data = await updatePost(postid, formDataRequest);
		if (!data) return;

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
					<ErrorMessage>
						Image size should not exceed 100 megabytes{' '}
					</ErrorMessage>
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

						<FormButton type='submit' disabled={isFormValid()}>
							{postid ? 'Update post' : 'Submit post'}
						</FormButton>
					</BottomRight>
				</FormBottomRow>
			</StyledPostForm>
		</PostFormContainer>
	);
}
