import axios from 'axios';

/**
 *
 * @param {File} file The image file to be uploaded
 * @param {Function} callback The callback function to be executed after the image is uploaded with the link as a parameter
 */
const uploadImage = (file, callback, errorCallback) => {
	const formData = new FormData();
	formData.append('image', file);

	axios({
		method: 'post',
		url: 'https://api.imgur.com/3/image',
		headers: {
			Authorization: `Client-ID ${process.env.NEXT_PUBLIC_IMGUR_CLIENT_ID}`,
		},
		data: formData,
	})
		.then(res => callback(res.data.data.link))
		.catch(err => errorCallback());
};

export default uploadImage;
