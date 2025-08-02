const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs-extra");
const { generateRandomData } = require("./utilities/randomGenerator");
const { validateSchema } = require("./utilities/schemaValidator");

const app = express();
const PORT = 3424;

app.use(cors());
app.use(bodyParser.json());

let registeredRoutes = [];
const SCHEMA_DIR = "./schemas"; // Directory to store schemas
fs.ensureDirSync(SCHEMA_DIR); // Ensure the directory exists

function loadMockRoutes() {
    try {
        const mockData = JSON.parse(fs.readFileSync("./mock-routes.json", "utf-8"));

        // Remove all previously registered routes except built-in ones
        app._router.stack = app._router.stack.filter(layer => !layer.route);

        registeredRoutes = [];

        Object.entries(mockData).forEach(([route, methods]) => {
            Object.entries(methods).forEach(([method, { status, response, schema }]) => {
                app[method.toLowerCase()](route, (req, res) => {

                    if (schema && response) {
                        console.warn(`⚠️ Route ${method} ${route} has both schema and response. Schema will be used.`);
                    }

                    if (["POST", "PUT"].includes(method) && schema) {
                        const isValid = validateSchema(schema, req.body);
                        if (!isValid) {
                            return res.status(400).json({ error: "Invalid request body" });
                        }
                    }

                    if (method === "GET" && schema) {
                        return res.status(status).json({ data: generateRandomData(schema), status });
                    }

                    if (method === "DELETE") {
                        return res.status(204).send(); // Or customize your delete logic
                    }
                    
                    res.status(status).json({ data: response, status: status });
                });
                registeredRoutes.push({ method: method.toUpperCase(), path: route });
            });
        });

        console.log("✅ Mock routes loaded successfully!");
        console.table(registeredRoutes);
    } catch (error) {
        console.error("❌ Error loading mock routes:", error);
    }
}

// Load routes initially
loadMockRoutes();

// for testing purposes, you can add a route to generate random data based on a schema
app.get('/randomData', (req, res) => {
    const schema = {
        type: "object",
        properties: {
            id: { type: "number" },
            name: { type: "string" }
        },
        required: ["id", "name"]
    };

    const randomData = generateRandomData(schema);
    res.json(randomData);
});


app.listen(PORT, () => {
    console.log(`🚀 Mock API server running at http://localhost:${PORT}`);
});
