import axios from 'axios';
import { getCurrentDate } from '../utils/getCurrentDate';
import { deleteOptions, getOptions } from '../data/requestParams';
import { BASE_URL } from './constants';

const getPosts = async () => {
	try {
		const response = await fetch(BASE_URL + '/api/posts', getOptions);

		const data = await response.json();

		return data;
	} catch (err) {
		return Promise.reject(err);
	}
};

const getUserPosts = async userid => {
	if (!userid) return;
	try {
		const response = await fetch(BASE_URL + `/api/${userid}/posts`, getOptions);

		const data = await response.json();
		return data;
	} catch (err) {
		return Promise.reject(err);
	}
};

const getImage = async image => {
	if (!image) return '';

	try {
		const data = await fetch(BASE_URL + '/images/' + image);

		return data;
	} catch (err) {
		return new Error(err);
	}
};

const createPost = async formDataRequest => {
	if (!formDataRequest) return;
	const timestamp = getCurrentDate();
	formDataRequest.append('timestamp', timestamp);

	try {
		const { data } = await axios.post(
			BASE_URL + '/api/post',
			formDataRequest,
			{}
		);

		return data;
	} catch (err) {
		return Promise.reject(err);
	}
};

const updatePost = async (postid, formDataRequest) => {
	if (!postid || !formDataRequest) return;

	try {
		const data = await axios.put(
			BASE_URL + '/api/posts/' + postid,
			formDataRequest,
			{}
		);

		return data;
	} catch (err) {
		return new Error(err);
	}
};

const deletePost = async postid => {
	if (!postid) return;

	try {
		const response = await fetch(
			BASE_URL + '/api/posts/' + postid,
			deleteOptions
		);
		const data = await response.json();

		return data;
	} catch (err) {
		return new Error(err);
	}
};

export { getPosts, getUserPosts, createPost, deletePost, getImage, updatePost };
