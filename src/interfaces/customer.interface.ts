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
	payload: {
		id: string;
		cpf: string;
		name: string;
		birthday: string;
	};
}

export { ICreateCustomer, IUpdateCustomer };
