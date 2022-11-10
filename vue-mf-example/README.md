# App2 uses App1 components

This example demos a App2(Implemented using VUEJS 3) application loading remote App1(Implemented using VUEJS 2) component.`App2` depends on a component exposed by `App1`.App3 is sample application which can use components from both App1 and App2.
Note: After downloading code install node_modules in all applications and add npmrc file in your local to make application up and running.

# Running Demo code

Run `npm run start` . This will build and serve both `App1` and `App2` on ports 3002 and 3001 respectively.

- HOST (App2): [localhost:3002](http://localhost:3002/)
- REMOTE (App1): [localhost:3001](http://localhost:3001/)
- App3 :  [localhost:3003](http://localhost:3003/)
