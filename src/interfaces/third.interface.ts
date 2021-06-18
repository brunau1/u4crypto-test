interface ICreateThird {
	payload: {
		cpf: string;
		name: string;
		birthday: string;
	};
}

interface IUpdateThird {
	payload: {
		cpf: string;
		name: string;
		birthday: string;
	};
}

interface IDeleteThird {
	headers: { authorization: string };
	payload: {
		cpf: string;
	};
}

export { ICreateThird, IUpdateThird, IDeleteThird };
