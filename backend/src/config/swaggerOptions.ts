export const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Bank NC API Docs',
      version: '1.0.0',
      description: 'API Documentation for Bank NC',
    },
    servers: [{ url: 'http://localhost:8080' }],
  },
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      scheme: 'bearer',
      in: 'header',
    },
  },
  apis: ['./src/docs/**/*.yaml'],
}
