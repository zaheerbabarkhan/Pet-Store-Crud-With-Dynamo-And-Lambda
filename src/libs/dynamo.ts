const aws = require('aws-sdk');
import { v4 } from 'uuid';

const dynamoClient = new aws.DynamoDB.DocumentClient({
	region: 'localhost',
	endpoint: 'http://localhost:8000',
});

const Dynamo = {
	async getPet(ID, TableName) {
		const params = {
			TableName,
			Key: {
				PetID: ID,
			},
		};
		const pet = await dynamoClient.get(params).promise();
		if (!pet || !pet.Item) {
			return 'No Pet Found';
		}

		return pet.Item;
	},
	async savePet(data, TableName) {
		const params = {
			TableName,
			Item: {
				PetID: v4(),
				Name: data.name,
				Tag: data.tag,
			},
		};

		try {
			await dynamoClient.put(params).promise();
			return params;
		} catch (error) {
			return {
				message: 'Pet Not Saved',
			};
		}
	},
	async deletePet(ID, TableName) {
		const params = {
			TableName,
			Key: {
				PetID: ID,
			},
		};

		try {
			await dynamoClient.delete(params).promise();
			return 'Pet Deleted';
		} catch (error) {
			return 'Pet Not Found';
		}
	},
	async getalldata(TableName) {
		const params = {
			TableName,
		};

		const res = await dynamoClient.scan(params).promise();

		if (!res) {
			throw Error(`There was in table ${TableName}`);
		}

		return res;
	},
	async getWithTags(limit, tags, TableName) {
		console.log(tags, '    ', limit);
		const params = {
			TableName,
			FilterExpression: 'Tag = :tags',
			ExpressionAttributeValues: { ':tags': tags },
			Limit: limit,
		};
		const pet = await dynamoClient.scan(params).promise();
		console.log(pet);
		if (!pet || pet.Items.length == 0) {
			return 'No Pet Found';
		}

		return pet.Items;
	},

	async updatePet(data, TableName) {
		const params = {
			TableName,
			Item: {
				PetID: data.PetID,
				Name: data.name,
				Tag: data.tag,
			},
		};

		try {
			await dynamoClient.put(params).promise();
			return params;
		} catch (error) {
			return {
				message: 'Pet Not Saved',
			};
		}
	},
};
export default Dynamo;
