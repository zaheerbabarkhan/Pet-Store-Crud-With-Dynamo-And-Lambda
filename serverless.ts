import type { AWS } from '@serverless/typescript';

import {addPet, findPet, deletePet, findPetWithTags} from '@functions/index';

const serverlessConfiguration: AWS = {
  service: 'aws-serverless-dynamodb-crud-task',
  frameworkVersion: '2',
  custom: {
		dynamodb: {
			stages: ['dev'],
			region: 'eu-west-2',
			start: {
				port: 8000,
				migrate: true,
				inMemory: true,
				heapInitial: '200m',
				seed: true,
				convertEmptyValues: true,
				heapMax: '1g',
			},
		},
		esbuild: {
			bundle: true,
			minify: false,
			sourcemap: true,
			exclude: ['aws-sdk'],
			target: 'node14',
			define: { 'require.resolve': undefined },
			platform: 'node',
		},
	},
  plugins: ['serverless-esbuild', 'serverless-dynamodb-local',
  'serverless-offline'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
    lambdaHashingVersion: '20201221',
  },
  // import the function via paths
  functions: { addPet , findPet, deletePet, findPetWithTags},
  resources: {
		Resources: {
			pettable: {
				Type: 'AWS::DynamoDB::Table',
				Properties: {
					TableName: 'PetTable1',
					AttributeDefinitions: [
						{
							AttributeName: 'PetID',
							AttributeType: 'S',
						},
					],
					KeySchema: [
						{
							AttributeName: 'PetID',
							KeyType: 'HASH',
						},
					],
					ProvisionedThroughput: {
						ReadCapacityUnits: 1,
						WriteCapacityUnits: 1,
					},
				},
			},
		},
	},
};

module.exports = serverlessConfiguration;
