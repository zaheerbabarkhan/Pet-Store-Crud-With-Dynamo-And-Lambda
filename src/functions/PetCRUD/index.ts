import {addPetSchema} from './schema';
import { handlerPath } from '@libs/handlerResolver';

export const addPet =  {
  handler: `${handlerPath(__dirname)}/handler.addPet`,
  events: [
    {
      http: {
        method: 'post',
        path: '/pets',
        request: {
          schema: {
            'application/json': addPetSchema
          }
        }
      }
    }
  ]
}



export const findPet =  {
  handler: `${handlerPath(__dirname)}/handler.findPet`,
  events: [
    {
      http: {
        method: 'get',
        path: '/pets/{id}',
        request: {
          parameters: {
            paths: {
              id: true
            }
          }
        }
      }
    }
  ]
}



export const deletePet =  {
  handler: `${handlerPath(__dirname)}/handler.deletePet`,
  events: [
    {
      http: {
        method: 'delete',
        path: '/pets/{id}',
        request: {
          parameters: {
            paths: {
              id: true
            }
          }
        }
      }
    }
  ]
}



export const findPetWithTags =  {
  handler: `${handlerPath(__dirname)}/handler.findPetWithTags`,
  events: [
    {
      http: {
        method: 'get',
        path: '/pets',
      }
    }
  ]
}



export const updatePet = {
	handler: `${handlerPath(__dirname)}/handler.updatePet`,
	events: [
		{
			http: {
				method: 'put',
				path: '/pets',
			},
		},
	],
};