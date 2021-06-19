interface ICreateThird {
	payload: {
		cpf: string;
		name: string;
		birthday: string;
	};
}

interface IUpdateThird {
	payload: {
		id: string;
		name: string;
		birthday: string;
	};
}

interface IDeleteThird {
	headers: { authorization: string };
	payload: {
		id: string;
	};
}

export { ICreateThird, IUpdateThird, IDeleteThird };
