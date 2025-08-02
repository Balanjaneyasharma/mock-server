/**
 * @typedef {Object} StringSchema
 * @property {'string'} type - The type of the value (string).
 * @property {'email' | 'phoneNumber' | 'date' | 'date-time'} [format] - Optional format (email, phone number, date, date-time).
 * @property {number} [maxItems] - Maximum length of the string.
 * @property {number} [minItems] - Minimum length of the string.
 */

/**
 * @typedef {Object} NumberSchema
 * @property {'number'} type - The type of the value (number).
 * @property {number} [min] - Minimum value.
 * @property {number} [max] - Maximum value.
 */

/**
 * @typedef {Object} BooleanSchema
 * @property {'boolean'} type - The type of the value (boolean).
 */

/**
 * @typedef {Object} NullSchema
 * @property {'null'} type - Represents a null value.
 */

/**
 * @typedef {Object} ArraySchema
 * @property {'array'} type - The type of the value (array).
 * @property {JSONSchema} items - The schema definition for array items.
 * @property {number} [minItems] - Minimum number of items.
 * @property {number} [maxItems] - Maximum number of items.
 */

/**
 * @typedef {Object} ObjectSchema
 * @property {'object'} type - The type of the value (object).
 * @property {Record<string, JSONSchema>} properties - The schema definition for object properties.
 * @property {string[]} [required] - List of required properties.
 */

/**
 * @typedef {Object} IDSchema
 * @property {'id'} type - Defines an ID (can be a number or a GUID).
 * @property {'number' | 'uuid'} format - Defines the format of the ID.
 */

/**
 * @typedef {StringSchema | NumberSchema | BooleanSchema | NullSchema | ArraySchema | ObjectSchema | IDSchema} JSONSchema
 */
