import { Queries } from '../../common/enums/queries/queries';
import type { QueryParams } from '../../common/types/query/query';

class QueryService {
	public generateQuery(action: string, params: QueryParams) {
		switch (action) {
			case Queries.GET_ALL:
				return `SELECT * FROM ${params.table}`;
			case Queries.GET_BY_ID:
				return `SELECT * FROM ${params.table} WHERE ${params.field} = ${params.sequence}`;
			case Queries.CREATE:
				return `INSERT INTO ${params.table} ${params.fields} VALUES ${params.sequence} RETURNING *`;
			case Queries.EDIT:
				return `UPDATE ${params.table} SET ${this.splitFields(
					params.fields,
					1
				)} WHERE ${params.fields?.split(',')[0]} RETURNING *`;
			case Queries.DELETE:
				return `DELETE FROM ${params.table} WHERE ${params.field} = ${params.sequence} RETURNING *`;
			default:
				throw 'Query does not exist';
		}
	}

	public createFieldsAndSequence<T extends {}>(data: T) {
		const dataObject = Object.keys(data).reduce((prev, curr, index, arr) => {
			prev[`$${index + 1}`] = `"${curr}"`;
			return prev;
		}, {} as { [key: string]: string });

		const fields = `(${Object.values(dataObject).join(', ')})`;
		const sequence = `(${Object.keys(dataObject).join(', ')})`;

		return [fields, sequence];
	}

	public createFieldsWithSequence<T extends {}>(data: T) {
		return Object.keys(data)
			.map((key, index) => `"${key}" = $${index + 1}`)
			.join(',');
	}

	private splitFields(fields: string | undefined, index: number) {
		return fields?.split(',').slice(index).join(', ') || '';
	}
}

export default new QueryService();
