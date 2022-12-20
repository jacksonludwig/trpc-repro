import { awsLambdaRequestHandler } from '@trpc/server/adapters/aws-lambda';
import { createContext, procedure, router } from './trpc';

const appRouter = router({
  testRoute: procedure.query(async () => {
    // mock fast db lookup
    await new Promise((res) => setTimeout(res, 100));

    return {
      value: 5,
      stringValue: 'sdkfja;lsdkjfalsdkjf;alksdjf;laksdjflaksjd;lkfajs;lkj',
    };
  }),
});

export const main = awsLambdaRequestHandler({
  router: appRouter,
  createContext,
});

export type AppRouter = typeof appRouter;
