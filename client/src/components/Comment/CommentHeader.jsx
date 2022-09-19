/* eslint-disable react/prop-types */
import React from 'react';
import { CommentTopRow, Username, CommentDate } from './_styles';
import { getRelativeCurrentDate } from '../../utils/getRelativeCurrentDate';

export function CommentHeader({ commentUserName, timestamp }) {
	return (
		<>
			<CommentTopRow>
				<Username>{commentUserName || '(deleted user)'}</Username>
				<CommentDate>{getRelativeCurrentDate(timestamp)}</CommentDate>
			</CommentTopRow>
		</>
	);
}
