import { Queries, HttpStatus } from '@enums/enums';
import type { QueryParams } from '@app-types/types';
import { HttpError } from '@helpers/helpers';

class QueryService {
	public generateQuery(action: string, params: QueryParams) {
		switch (action) {
			case Queries.GET_ALL:
				return `SELECT * FROM ${params.table}`;
			case Queries.SEARCH:
				return `SELECT * FROM ${params.table} WHERE ${params.field}`;
			case Queries.GET_ALL_SPECIFY:
				return `SELECT * FROM ${params.table} ${params.searchString}`;
			case Queries.CREATE:
				return `INSERT INTO ${params.table} ${params.fields} VALUES ${params.sequence} RETURNING *`;
			case Queries.EDIT:
				return `UPDATE ${params.table} SET ${this.splitFields(
					params.fields,
					1
				)} WHERE ${params.fields?.split(',')[0]} RETURNING *`;
			case Queries.DELETE:
				return `DELETE FROM ${params.table} WHERE ${params.field} RETURNING *`;
			default:
				throw new HttpError(
					HttpStatus.INTERNAL_SERVER_ERROR,
					'Cannot get book, invalid request query'
				);
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

	public createSearchString<T extends Record<string, any>>(
		data: Partial<T>
	): string {
		const searchStrings = Object.keys(data).reduce((prev, curr, index, arr) => {
			if (Number(data[curr])) {
				prev.push(
					`(COALESCE($${index + 1}, 0) = 0  OR "${curr}" = $${index + 1})`
				);
			} else {
				prev.push(
					`(COALESCE($${index + 1}, '') = '' OR "${curr}" LIKE CONCAT('%', $${
						index + 1
					}, '%'))`
				);
			}
			return prev;
		}, [] as string[]);

		return this.concatSearchStrings(searchStrings);
	}

	private concatSearchStrings(strings: string[]): string {
		const head = `WHERE ${strings[0]} `;
		let tail = '';
		if (strings.length > 1) {
			tail = strings
				.slice(1)
				.map((str) => {
					return `AND ${str}`;
				})
				.join(' ');
		}

		return head + tail;
	}

	private splitFields(fields: string | undefined, index: number) {
		return fields?.split(',').slice(index).join(', ') || '';
	}
}

export default new QueryService();
