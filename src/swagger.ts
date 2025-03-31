import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as basicAuth from 'express-basic-auth';

const swaggerEnvs = process.env.SWAGGER_ENVS!.split(',');

interface IOperations {
  _root: {
    entries: [string, string][];
  };
}

function operationsSorter(a: IOperations, b: IOperations) {
  const httpMethodOrder: Record<string, number> = {
    get: 1,
    post: 2,
    patch: 3,
    put: 4,
    delete: 5,
  };

  const getMethodAndPath = (operation: IOperations) => ({
    method:
      httpMethodOrder[
        operation._root.entries
          .find((entry) => entry[0] === 'method')?.[1]
          ?.toLowerCase() ?? ''
      ] ?? 99,
    path:
      operation._root.entries.find((entry) => entry[0] === 'path')?.[1] ?? '',
  });

  const { method: orderA, path: pathA } = getMethodAndPath(a);
  const { method: orderB, path: pathB } = getMethodAndPath(b);

  return orderA - orderB || pathA.localeCompare(pathB);
}

export const setupSwagger = (app: INestApplication): void => {
  if (
    swaggerEnvs.includes(process.env.NODE_ENV!) &&
    process.env.SWAGGER_USER &&
    process.env.SWAGGER_PASSWORD
  ) {
    app.use(
      ['/docs', '/docs-json'],
      basicAuth({
        challenge: true,
        users: {
          [process.env.SWAGGER_USER]: process.env.SWAGGER_PASSWORD,
        },
      }),
    );
  }

  const options = new DocumentBuilder()
    .setTitle('Blockbuster API')
    .setDescription('API created by Ignacio Gonzalez')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      operationsSorter,
    },
  });
};
