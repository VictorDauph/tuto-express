const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
    definition: {
        openapi: '3.0.0', // Version de l'OpenAPI Specification
        info: {
            title: 'API Documentation',
            version: '1.0.0',
            description: 'Documentation de l’API Express.js avec Swagger',
        },
        servers: [
            {
                url: 'http://localhost:3000', // URL de votre API
            },
        ],
    },
    apis: ['./dist/routes/*.{js,ts}', './src/routes/*.{ts,js}']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export default swaggerDocs;
