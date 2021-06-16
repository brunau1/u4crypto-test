interface ICreateCustomer {
	payload: {
		cpf: string;
		name: string;
		email: string;
		birthday: string;
		password: string;
	};
}

export { ICreateCustomer };
