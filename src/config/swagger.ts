import swaggerJSDoc from 'swagger-jsdoc'

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'RT Backend API',
      version: '1.0.0',
    },
    servers: [
      { url: `http://localhost:${process.env.PORT || 3000}` }
    ],
  },
  apis: ['src/routes/**/*.ts', 'src/controllers/**/*.ts'],
}

export const swaggerSpec = swaggerJSDoc(options)
