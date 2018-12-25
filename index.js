'use strict'

const {createApolloFetch} = require('apollo-fetch');

const uri = 'http://localhost:4000/graphql';
// const uri = 'http://no-ssl-route-user1.apps.waterford-a1bc.openshiftworkshop.com/graphql';
const apolloFetch = createApolloFetch({uri});

apolloFetch.use(({request, options}, next) => {
    if (!options.headers) {
        options.headers = {};  // Create the headers object if needed.
    }
    // options.headers['authorization'] = '6bmQFbdVj5y2ApFDivcrGYi6okcXLOGOza7me4hEajw';
    options.headers['Authorization'] = 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI5UnFISG1HeE9KTkZ2WFk0dWM4THFMUkljNVFCZjA3dFJYcDNrY1JVcHhJIn0.eyJqdGkiOiI1ODExZjgwZS1jYzk4LTRjZGEtOWZjNy0xMmM2OTgyYTJlNjIiLCJleHAiOjE1NDU3NzgzODAsIm5iZiI6MCwiaWF0IjoxNTQ1NzQyMzgwLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwODAvYXV0aC9yZWFsbXMvdm95YWdlci10ZXN0aW5nIiwiYXVkIjoidm95YWdlci10ZXN0aW5nIiwic3ViIjoiNjdkNGFiNjQtNDgxNS00MzExLWE1OWUtMzAyMDljYjhhYzJjIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoidm95YWdlci10ZXN0aW5nIiwiYXV0aF90aW1lIjoxNTQ1NzQyMzgwLCJzZXNzaW9uX3N0YXRlIjoiYjY4NGEzNDktYmRmNy00MTBjLTkyZWYtOWM4ZjZiZTZkOGI2IiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyIqIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJhZG1pbiIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsidm95YWdlci10ZXN0aW5nIjp7InJvbGVzIjpbImFkbWluIl19LCJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJuYW1lIjoiQWxpIE9rIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiZGV2ZWxvcGVyIiwiZ2l2ZW5fbmFtZSI6IkFsaSIsImZhbWlseV9uYW1lIjoiT2siLCJlbWFpbCI6ImFsaW9rQGFsaW9rLmNvbS50ciJ9.QZ8uiv1Z1gqiDjQAS6gwBsQ-O_YWr-qSI7EDVAhz3irndh5PCSbIfjTAF2EAqJxAZbYxhV3Iih932_5eQkowhKF61Tx5aSA5wY9ELeG2bJ5mU8uTzdnyxWdlPvdbJDpVUeCAxcJLgW8JnkykAQHEUjbVoT87YxxfgFTGmXZwEY4W_Qm8DiE8uqQFLhqdRQunQBLeKxjjPPVBOY7OZk7rlsyxjLS7UVaik4CGmGBYahmbrSivBJujn4jctKdKJ_k7D1UEdZgXeXfe92lDA7GKEheMTcXGDBaXfzKAravmn09hfCqlf6AwUx8_5RyfbN_D5jzEgwFSEY2WvLfClqbjyg';

    next();
});

function fails() {
    const query = `
        query fails {
          fails
        }
    `;

    return execute(query, {}, "fails");
}

function getUser() {
    const query = `
        query getUser($id: Int!) {
          getUser(id:$id){
            id
            name
            memes {
              id
              url
            }
          }
        }
    `;

    const id = Math.ceil(Math.random() * 100 + 1);

    return execute(query, {id: id}, "getUser");
}

function createMeme() {
    const query = `
        mutation createMeme($userId: Int!, $url: String!) {
          createMeme(userId: $userId, url: $url) {
              id
              url
          }
        }
    `;

    const userId = Math.ceil(Math.random() * 100 + 1);
    const url = "photo" + Math.ceil(Math.random() * 1000 + 1);

    return execute(query, {userId: userId, url: url}, "createMeme");
}

function createUser() {
    const query = `
        mutation createUser($name: String!) {
          createUser(name: $name) {
            id
            name
          }
        }
    `;

    const name = "name" + Math.ceil(Math.random() * 100 + 1);

    return execute(query, {name: name}, "createUser");
}

function execute(query, variables, operationName) {
    return apolloFetch({query, variables, operationName})
        .then(result => {
            const {data, errors, extensions} = result;
            if (errors) {
                console.log("GraphQL error");
                console.log(errors);
            } else {
                console.log("\t success");
            }
            return Promise.resolve()
        })
        .catch(error => {
            console.log("Network error");
            console.log(error);
            return Promise.resolve()
        });
}

function pickRandomOperation() {
    const operations = [
        createMeme, createMeme,
        createUser,
        getUser, getUser,
        fails
    ];
    // if(1===1){
    //     // return fails;
    //     // return createUser;
    //     // return getUser;
    //     // return createMeme;
    // }
    const randomIndex = Math.floor(Math.random() * operations.length);
    return operations[randomIndex];
}


async function main() {
    while (true) {
        const operation = pickRandomOperation();
        console.log("Executing operation: " + operation.name);
        await operation();
    }
}

main();