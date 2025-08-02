const { faker } = require('@faker-js/faker');

/**
 * Converts a UTC date-time to Indian Standard Time (IST - UTC+5:30).
 * @param {string} isoDateTime - The UTC date-time string.
 * @returns {string} - Formatted IST date-time string in "YYYY-MM-DD HH:mm:ss" format.
 */
const convertToIST = (isoDateTime) => {
	const options = {
		timeZone: "Asia/Kolkata",
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
		hour12: false,
	};
	return new Date(isoDateTime).toLocaleString("en-IN", options).replace(",", "").replace(/\//g, "-");
};

/**
 * Generates random data based on the provided JSON schema.
 * @param {JSONSchema} schema - The JSON schema to generate data from.
 * @returns {any} - The generated random data on the basis of the schema.
 */
const generateRandomData = (schema) => {
	switch (schema.type) {
		case "string":
			const strLength = faker.number.int({ min: schema.minLength || 3, max: schema.maxLength || 10 });
			if (schema.format === "email") return faker.internet.email();
			if (schema.format === "date") return faker.date.anytime().toISOString().split("T")[0];
			if (schema.format === "date-time") return faker.date.anytime().toISOString();
			if (schema.format === "phoneNumber") return faker.phone.number();
			return faker.string.alpha({ length: strLength });

		case "id":
			if (schema.format === "uuid") return faker.string.uuid();
			return faker.number.int({ min: 1, max: 100000 });

		case 'number':
			return faker.number.int({ min: schema.min || 1, max: schema.max || 100 });

		case 'boolean':
			return faker.datatype.boolean();

		case 'null':
			return null;

		case 'array':
			const length = faker.number.int({ min: Math.min(3, schema.minItems), max: Math.max(4, schema.maxItems) });
			return Array.from({ length }, () => generateRandomData(schema.items));

		case 'object':
			const obj = {};
			for (const key in schema.properties) {
				obj[key] = generateRandomData(schema.properties[key]);
			}
			return obj;

		default:
			throw new Error(`Unsupported schema type: ${schema.type}`);
	}
}
module.exports = { generateRandomData };


