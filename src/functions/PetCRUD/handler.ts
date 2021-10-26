import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import dynamo from '../../libs/dynamo';
import { addPetSchema } from './schema';

/**
 *
 * @param name Tag
 * @returns Saved Pet<object>
 */
const add: ValidatedEventAPIGatewayProxyEvent<typeof addPetSchema> = async (
	event
) => {
	const petData = event.body;
	const response = await dynamo.savePet(petData, 'PetTable1');
	return formatJSONResponse({
		Pet: response,
	});
};

export const addPet = middyfy(add);

/**
 *
 * fetching the pet using id given in path paramss
 * @returns Pet<Object>
 */
const find: ValidatedEventAPIGatewayProxyEvent<typeof addPetSchema> = async (
	event
) => {
	const { id } = event.pathParameters;
	console.log(id);
	const response = await dynamo.getPet(id, 'PetTable1');

	return formatJSONResponse({
		Pet: response,
	});
};

export const findPet = middyfy(find);

/**
 *
 * @param Id of the ped
 * @returns deleting the specified pet
 */
const deletepet: ValidatedEventAPIGatewayProxyEvent<typeof addPetSchema> =
	async (event) => {
		const { id } = event.pathParameters;
		console.log(id);
		const response = await dynamo.deletePet(id, 'PetTable1');

		return formatJSONResponse({
			Pet: response,
		});
	};

export const deletePet = middyfy(deletepet);

/**
 *
 * @param tag of the pet
 * @returns finding the pets on the basis of tag
 */
const findWithTags: ValidatedEventAPIGatewayProxyEvent<typeof addPetSchema> =
	async (event) => {
		const { limit, tags } = event.queryStringParameters;

		const response = await dynamo.getWithTags(limit, tags, 'PetTable1');

		return formatJSONResponse({
			Pet: response,
		});
	};

export const findPetWithTags = middyfy(findWithTags);
