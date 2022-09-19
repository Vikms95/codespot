/* eslint-disable no-debugger */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { CommentHeader } from './CommentHeader';
import { CommentBody, CommentChildren } from './index';
import { ReplyButton } from './ReplyButton';
import { AuthButton } from './AuthButton';

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

	const childComments = getChildComments(commentid);

	return (
		<>
			<CommentBody
				text={text}
				commentid={commentid}
				commentUserId={commentUser._id}
				childComments={childComments}
				isDeletedWithChildren={isDeletedWithChildren}
				handleCommentSubmit={handleCommentSubmit}
				getChildComments={getChildComments}
			>
				<CommentHeader
					timestamp={timestamp}
					commentUserName={commentUser.username}
				/>
				<AuthButton />
				<ReplyButton />
			</CommentBody>

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
