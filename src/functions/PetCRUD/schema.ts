export const addPetSchema =  {
  type: "object",
  properties: {
    name: { type: 'string' },
    tag: {type: 'string'}
  },
  required: ['name', 'tag']
} as const;


export const findPetSchema =  {
  type: "object",
  properties: {
   
  },
  
} as const;



export const updatePet = {
	type: 'object',
	properties: {
		PetID: { type: 'string' },
		name: { type: 'string' },
		tag: { type: 'string' },
	},
} as const;
