export function validateRequest(data) {
	const errors: Array<string> = [];
	Object.keys(data).map((key) => {
		if (!data[key]) errors.push(key);
	});
	if (errors.length > 0)
		throw {
			message: `Missing the following properties: ${errors.join(', ')}`,
		};
}
