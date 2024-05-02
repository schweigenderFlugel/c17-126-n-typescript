export const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Bank NC API Docs',
      version: '1.0.0',
      description: 'API Documentation for Bank NC',
    },
    servers: [{ url: 'http://localhost:8080' }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    }, 
  },
  apis: ['./src/docs/**/*.yaml'],
}
