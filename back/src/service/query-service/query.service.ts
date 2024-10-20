import { Queries } from '../../common/enums/queries/queries';

class QueryService {
	public generateQuery(action: string, params: any) {
		switch (action) {
			case Queries.GET_ALL:
				return `SELECT * FROM ${params.table}`;
			case Queries.CREATE:
				return `INSERT INTO ${params.table} ${params.fields} VALUES ${params.sequence} RETURNING *`;
			default:
				return '';
		}
	}
}

export default new QueryService();
