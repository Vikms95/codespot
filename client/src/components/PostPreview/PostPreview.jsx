/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import styled from 'styled-components';
import { Button } from '../../style/Button';
import { useHtmlAsText } from '../../hooks/useHtmlAsText';
import defaultPostImage from '../../assets/default-image.jpg';
import { FaBookOpen, FaComments } from 'react-icons/fa';
import { useImage } from '../../hooks/useImage';
import { useCommentsCount } from '../../hooks/useCommentsCount';


const StyledPostPreview = styled.section`
	display: flex;
	justify-content: space-between;
	align-items: stretch;
	flex-direction: column;
	box-shadow: 4px 4px 10px -2px gray;
	border-top-left-radius: 10px;
	border-top-right-radius: 10px;
	max-height: 40em;
	text-overflow: ellipsis;
`;

const PostImageContainer = styled.article`
	object-fit: cover;
	height: 100%;
`;

const PostImage = styled.img`
	border-radius: 10px;
	width: 100%;
	height: 18em;
`;

const StyledBookImage = styled(FaBookOpen)`
	display: none;
	position: absolute;
	color: white;
	font-size: 3em;
	top: 40%;
	left: 45%;
	z-index: 1;
`;

const BookText = styled.span`
	display: none;
	position: absolute;
	color: white;
	font-size: 1em;
	top: 60%;
	left: 38%;
	z-index: 1;
`;

const PostLink = styled(Link)`
	display: flex;
	position: relative;

	&:hover ${PostImage} {
		filter: brightness(0.8);
		transform: scale(1.005, 1.005);
		transition: transform 0.5s;
	}

	&:hover ${StyledBookImage} {
		display: block;
	}

	&:hover ${BookText} {
		display: block;
	}
`;

const PostContentContainer = styled.article`
	display: flex;
	flex-direction: column;
	row-gap: 1em;
	padding: 1.5em;
	height: 100%;
`;

const PostTopRowContainer = styled.article`
	display: flex;
	justify-content: space-between;
`;

const PostTopRow = styled.h3`
	margin: 0 0 0.8em 0;
	font-size: smaller;
	color: #8d8d8d;
	display: flex;
	align-self: flex-end;
`;

const PostTitle = styled.h2`
	margin: 0;
	font-size: larger;
`;

const PostDesc = styled.div`
	display: -webkit-box;
	overflow: hidden;
	-webkit-line-clamp: 1;
	-webkit-box-orient: vertical;
	margin-bottom: 1rem;
	padding: 0;
`;

const PostBotRowContainer = styled.div`
  display: flex;
  justify-content: space-around;
`

const PostButtonContainer = styled.article`
	display: flex;
  column-gap: 2em;
`;

const PostCommentsContainer = styled.article`
  display: flex;
  color: #c8c6c6;
  font-size: 2em;
  gap: .2em;
`

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
  const commentsCount = useCommentsCount(id)

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
					<PostTopRow>{user.username}</PostTopRow>
					<PostTopRow>{timestamp}</PostTopRow>
				</PostTopRowContainer>

				<PostTitle>{title}</PostTitle>
				<PostDesc ref={textRef}></PostDesc>
        <PostBotRowContainer>
          {
            (user._id === currentUserId) && 
              <PostButtonContainer>
                <Button onClick={handleUpdate}>Update</Button>
                <Button onClick={revealDeleteModal}>Delete</Button>
              </PostButtonContainer>
          
          }
          {
            (commentsCount > 0) &&  
            <PostCommentsContainer>
              <FaComments/>
              {commentsCount}
            </PostCommentsContainer>

          }
        </PostBotRowContainer>
			</PostContentContainer>
		</StyledPostPreview>
	);
}

export default PostPreview;
