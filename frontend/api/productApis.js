export const getProductImages = async ({ category }) => {
	let url = `${process.env.API_URL}/api/product/images?category=${category}`;

	if (!category) {
		url = `${process.env.API_URL}/api/product/images`;
	}
	const config = {
		method: "GET",
		headers: {
			"x-api-key": "token",
		},
		url,
	};

	try {
		let response = await axios(config);
		return response.data;
	} catch (error) {
		console.error("Error while getting product Images", error);
		// Handle the error appropriately
		throw error;
	}
};

export const getCategoryColor = async ({ category }) => {
	let url = `${process.env.API_URL}/api/product/getColor?category=hoodie`;
	if (!category) {
		console.error("no category selected");
		throw new Error("please select a category");
	}
	const config = {
		method: "GET",
		headers: {
			"x-api-key": "token",
		},
		url,
	};
	try {
		let response = await axios(config);
		return response.data;
	} catch (error) {
		console.error("Error while getting product colors", error);
		// Handle the error appropriately
		throw error;
	}
};

export const getProducts = async ({ product_id }) => {
	let url = `${process.env.API_URL}/api/product/read/${product_id}`;
	if (!product_id) {
		console.error("no category selected");
		throw new Error("please select a category");
	}
	const config = {
		method: "GET",
		headers: {
			"x-api-key": "token",
		},
		url: url || undefined,
	};
	try {
		let response = await axios(config);
		return response.data;
	} catch (error) {
		console.error("Error while getting product colors", error);
		// Handle the error appropriately
		throw error;
	}
};
