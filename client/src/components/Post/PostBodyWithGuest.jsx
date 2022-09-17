import React from 'react';
import { PostBody } from './PostBody';
import { Link } from 'react-router-dom';
import { LoginLinkText } from './_styles';

export function PostBodyWithGuest(props) {
	return (
		<PostBody {...props}>
			<LoginLinkText>
				<span>Want to leave your comment?</span> <Link to='/login'>Login</Link>
			</LoginLinkText>
		</PostBody>
	);
}
