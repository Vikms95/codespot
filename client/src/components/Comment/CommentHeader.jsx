/* eslint-disable react/prop-types */
import React from 'react';
import { CommentTopRow, Username, CommentDate, Text } from './_styles';
import { getRelativeCurrentDate } from '../../utils/getRelativeCurrentDate';

export function CommentHeader(props) {
	const { commentUserName, timestamp, text } = props;
	return (
		<>
			<CommentTopRow>
				<Username>{commentUserName || '(deleted user)'}</Username>
				<CommentDate>{getRelativeCurrentDate(timestamp)}</CommentDate>
			</CommentTopRow>
		</>
	);
}
