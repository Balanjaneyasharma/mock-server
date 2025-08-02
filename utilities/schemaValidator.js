/**
 * Validates data against a JSON schema.
 * @param {JSONSchema} schema - The JSON schema to validate against.
 * @param {any} data - The data to validate.
 * @returns {boolean} - True if the data is valid, otherwise false.
 */
const validateSchema = (schema, data) => {
    if (!schema || typeof schema !== "object") return false;

    const { type, required, properties, minLength, maxLength, minItems, maxItems, min, max, items, enum: enumValues, pattern, format } = schema;

    switch (type) {
        case "object":
            if (typeof data !== "object" || data === null || Array.isArray(data)) return false;
            if (required?.some(key => !(key in data))) return false;
            return properties ? Object.entries(properties).every(([key, subSchema]) => validateSchema(subSchema, data[key])) : true;

        case "string":
            if (typeof data !== "string") return false;
            if (minLength && data.length < minLength) return false;
            if (maxLength && data.length > maxLength) return false;
            if (enumValues && !enumValues.includes(data)) return false;
            if (pattern && !(new RegExp(pattern).test(data))) return false;

            // Format validation
            if (format === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data)) return false;
            if (format === "uuid" && !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(data)) return false;
            if (format === "phoneNumber" && !/^\+?[0-9]{10,15}$/.test(data)) return false;
            if (format === "date" && isNaN(Date.parse(data))) return false;
            if (format === "date-time" && isNaN(Date.parse(data))) return false;

            return true;

        case "number":
            if (typeof data !== "number") return false;
            if (min !== undefined && data < min) return false;
            if (max !== undefined && data > max) return false;
            if (enumValues && !enumValues.includes(data)) return false;
            return true;

        case "boolean":
            return typeof data === "boolean";

        case "array":
            if (!Array.isArray(data)) return false;
            if (minItems !== undefined && data.length < minItems) return false;
            if (maxItems !== undefined && data.length > maxItems) return false;
            return data.every(item => validateSchema(items, item));

        case "null":
            return data === null;

        case "id":
            if (format === "uuid") {
                return typeof data === "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(data);
            } else if (format === "number") {
                return typeof data === "number";
            }
            return false;

        default:
            return false;
    }
};

module.exports = { validateSchema };
