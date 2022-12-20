1. run `npm i` in server and `npm i --legacy-peer-deps` in client.
2. run `npx cdk deploy --all --require-approval never` in server
3. replace the api endpoint `App.tsx` with endpoint of the restapi server output
4. run `npm start` in the client and examine some requests fail with `Badly formatted Response from Server` or `Could not transform Response from server`
