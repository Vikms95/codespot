/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import defaultPostImage from '../../assets/default-image.jpg';
import { useNavigate } from 'react-router-dom';
import { useHtmlAsText } from '../../hooks/useHtmlAsText';
import { useImage } from '../../hooks/useImage';
import { FaComments } from 'react-icons/fa';
import { useCommentsCount } from '../../hooks/useCommentsCount';
import { Button } from '../../style/Button';
import {
	BookText,
	PostBotRowContainer,
	PostButtonContainer,
	PostCommentsContainer,
	PostContentContainer,
	PostDesc,
	PostImage,
	PostImageContainer,
	PostLink,
	PostTitle,
	PostTopRow,
	PostTopRowContainer,
	StyledBookImage,
	StyledPostPreview,
} from './PostPreview.styles';

function PostPreview(props) {
	const navigate = useNavigate();

	const {
		id,
		user,
		title,
		text,
		image,
		timestamp,
		setIsModalActive,
		setLastClickedPostId,
	} = props;

	const { user: currentUserId } = useContext(AuthContext);
	const textRef = useHtmlAsText(text);
	const imageSrc = useImage(image, [image]);
	const commentsCount = useCommentsCount(id);

	const handleUpdate = () => {
		return navigate('/update/' + id);
	};

	const revealDeleteModal = () => {
		setIsModalActive(true);
		setLastClickedPostId(id);
	};

	return (
		<StyledPostPreview>
			<PostImageContainer>
				<PostLink to={`/${id}`}>
					<StyledBookImage></StyledBookImage>
					<BookText>Read this article</BookText>

					<PostImage
						src={imageSrc?.ok ? imageSrc.url : defaultPostImage}
						alt='post-preview'
					/>
				</PostLink>
			</PostImageContainer>

			<PostContentContainer>
				<PostTopRowContainer>
					{/* <PostTopRow>{user.username}</PostTopRow> */}
					<PostTopRow>{timestamp}</PostTopRow>
				</PostTopRowContainer>

				<PostTitle>{title}</PostTitle>
				<PostDesc ref={textRef}></PostDesc>

				<PostBotRowContainer>
					{/* {user._id === currentUserId && (
						<PostButtonContainer>
							<Button onClick={handleUpdate}>Update</Button>
							<Button onClick={revealDeleteModal}>Delete</Button>
						</PostButtonContainer>
					)} */}
					{commentsCount > 0 && (
						<PostCommentsContainer>
							<FaComments />
							{commentsCount}
						</PostCommentsContainer>
					)}
				</PostBotRowContainer>
			</PostContentContainer>
		</StyledPostPreview>
	);
}

export default PostPreview;
