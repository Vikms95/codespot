import { useState } from 'react';

export const useForm = formFields => {
	const [formData, setFormData] = useState(formFields);

	const handleChange = e => {
		setFormData(prevFormData => ({
			...prevFormData,
			[e.target.name]: e.target.value,
		}));
	};

	return { formData, setFormData, handleChange };
};
