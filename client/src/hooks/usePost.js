import { useEffect, useState } from 'react';

export function usePost(postid, posts) {
	const [post, setPost] = useState('');

	useEffect(() => {
		if (posts) {
      console.log(postid, posts)
			const postToReturn = posts.find(post => post._id === postid);
      console.log(postToReturn)
      if(postToReturn){
        setPost(postToReturn);
      }
		}
	}, [posts]);

	return post;
}
