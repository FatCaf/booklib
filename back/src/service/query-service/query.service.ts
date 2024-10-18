import { Queries } from '../../common/enums/queries/queries';

class QueryService {
	public generateQuery(action: string, params: any) {
		switch (action) {
			case Queries.GET_ALL:
				return `SELECT * FROM ${params.table}`;
			default:
				return '';
		}
	}
}

export default new QueryService();
