const Ajv = require('ajv');
const data = require('./data');
const schema = require('./schema');

const ajv = new Ajv({ allErrors: true });
const validate = ajv.compile(schema);
const isValid = validate(data);

if (isValid) {
  console.log('Data is valid');
} else {
  console.error('Data is invalid:', ajv.errorsText(validate.errors));
  process.exit(1);
}
