// TODO quando for adicionar um incidente, o campo de
// terceiros deve conter os CPFs dos terceiros
import * as Hapi from '@hapi/hapi';
import * as Boom from '@hapi/boom';
import AccidentService from '../services/accident.service';
import Accident from '../models/accident.model';
export default class AccidentController {
	// o customer vai poder pegar os acidentes em que teve
	// envolvimento e os que ele cadastrou
	public async find(request: Hapi.Request, h: Hapi.ResponseToolkit) {
		const accidents: Array<Accident> =
			await AccidentService.findAccidentByCustomerId(
				request.headers.authorization
			);
		if (!accidents || accidents.length == 0)
			return Boom.notFound('Accidents not found');
		return h
			.response({
				message: 'Found',
				data: accidents,
			})
			.code(200);
	}
}
