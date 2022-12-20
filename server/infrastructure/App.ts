import { App, Stack, StackProps } from 'aws-cdk-lib';
import { LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { HttpMethod, Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { join } from 'path';

const app = new App({});

class ExampleStack extends Stack {
  constructor(scope: App, id: string, props: StackProps) {
    super(scope, id, props);

    const restApi = new RestApi(this, 'TRPC API', {
      deployOptions: { stageName: 'dev' },
      defaultCorsPreflightOptions: {
        allowHeaders: ['*'],
        allowMethods: ['*'],
        allowCredentials: true,
        allowOrigins: ['*'],
      },
    });

    const fn = new NodejsFunction(this, 'testLambda', {
      handler: 'main',
      entry: join(__dirname, `../index.ts`),
      memorySize: 256,
      bundling: {
        minify: true,
      },
      runtime: Runtime.NODEJS_16_X,
    });

    restApi.root.addResource('testRoute').addMethod(HttpMethod.GET, new LambdaIntegration(fn));
  }
}

function Main() {
  new ExampleStack(app, 'Example', {});
}

Main();
