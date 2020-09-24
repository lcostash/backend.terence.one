import { ValidationSchema } from 'class-validator';

export let LocalValidation: ValidationSchema = {
  name: 'LocalValidationSchema',
  properties: {
    username: [
      {
        type: 'isEmail',
        constraints: [],
      },
      {
        type: 'maxLength',
        constraints: [255],
      },
    ],
    password: [
      {
        type: 'minLength',
        constraints: [8],
      },
      {
        type: 'maxLength',
        constraints: [255],
      },
    ],
  },
};
