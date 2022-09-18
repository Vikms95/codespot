/* eslint-disable no-debugger */
/* eslint-disable react/prop-types */
import React from 'react';
import { useAuthContext } from '../../context/AuthContext';
import { CommentBody, CommentChildren } from './index';

export default function Comment(props) {
	const {
		text,
		commentid,
		timestamp,
		commentUser,
		getChildComments,
		handleCommentSubmit,
		isDeletedWithChildren,
	} = props;

	const { user: loggedInUserID } = useAuthContext();
	const childComments = getChildComments(commentid);

	return (
		<>
			<CommentBody
				text={text}
				commentid={commentid}
				timestamp={timestamp}
				commentUser={commentUser}
				childComments={childComments}
				loggedInUserID={loggedInUserID}
				isDeletedWithChildren={isDeletedWithChildren}
				handleCommentSubmit={handleCommentSubmit}
				getChildComments={getChildComments}
			/>

			{childComments?.length > 0 && (
				<CommentChildren
					childComments={childComments}
					getChildComments={getChildComments}
					handleCommentSubmit={handleCommentSubmit}
				/>
			)}
		</>
	);
}
