interface ICreateCustomer {
	payload: {
		cpf: string;
		role: string;
		name: string;
		email: string;
		birthday: string;
		password: string;
	};
}

interface IUpdateCustomer {
	headers: { authorization: string };
	payload: {
		id: string;
		name: string;
		birthday: string;
	};
}

interface IDeleteCustomer {
	headers: { authorization: string };
	payload: {
		id: string;
	};
}

export { ICreateCustomer, IDeleteCustomer, IUpdateCustomer };
