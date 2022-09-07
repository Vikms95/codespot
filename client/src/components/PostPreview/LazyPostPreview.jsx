import { userNearScreen } from '../../hooks/useNearScreen';
import { StyledPostPreview } from './_styles';
import { PostPreview } from './PostPreview';

export function LazyPostPreview(props) {
	const { isNearScreen, fromRef } = userNearScreen();

	return (
		<StyledPostPreview ref={fromRef}>
			{isNearScreen ? <PostPreview {...props}></PostPreview> : null}
		</StyledPostPreview>
	);
}
