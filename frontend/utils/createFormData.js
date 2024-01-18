const createFormDataFromObject = (data) => {
	const formData = new FormData();
	Object.entries(data).forEach(([key, value]) => {
		// If the value is an array, append each element separately
		if (Array.isArray(value)) {
			value.forEach((element, index) => {
				formData.append(`${key}[${index}]`, element);
			});
		} else {
			formData.append(key, value);
		}
	});
	return formData;
};
