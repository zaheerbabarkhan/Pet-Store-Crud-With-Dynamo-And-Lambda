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
	const response = await dynamo.savePet(petData, 'PetPetTable1');
	const response2 = await dynamo.getalldata('PetPetTable1');
	return formatJSONResponse({
		Pet: response,
		allPets: response2,
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
	const response = await dynamo.getPet(id, 'PetPetTable1');

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
		const response = await dynamo.deletePet(id, 'PetPetTable1');

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

		const response = await dynamo.getWithTags(limit, tags, 'PetPetTable1');

		return formatJSONResponse({
			Pet: response,
		});
	};

export const findPetWithTags = middyfy(findWithTags);

const updateHandler: ValidatedEventAPIGatewayProxyEvent<typeof updatePet> =
	async (event) => {
		const updateData = event.body;
		const response = await dynamo.updatePet(updateData, 'PetPetTable1');
		return formatJSONResponse({
			response,
		});
	};

export const updatePet = middyfy(updateHandler);