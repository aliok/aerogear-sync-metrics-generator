'use strict'

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;


const {createApolloFetch, constructDefaultOptions} = require('apollo-fetch');

// const uri = 'http://localhost:4000/graphql';
const uri = 'http://nodejs-ex-aaa.apps.istanbul-6b4b.openshiftworkshop.com/graphql';

const constructOptions = (requestOrRequests, options) => {
    const constructed = constructDefaultOptions(requestOrRequests, options)

    const body = JSON.parse(constructed.body);
    body.extensions = {metrics: createRandomClientInfo()};

    constructed.body = JSON.stringify(body);

    return constructed;
};
const apolloFetch = createApolloFetch({uri, constructOptions });

apolloFetch.use(({request, options}, next) => {
    if (!options.headers) {
        options.headers = {};  // Create the headers object if needed.
    }
    // options.headers['Authorization'] = 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI5UnFISG1HeE9KTkZ2WFk0dWM4THFMUkljNVFCZjA3dFJYcDNrY1JVcHhJIn0.eyJqdGkiOiI1ODExZjgwZS1jYzk4LTRjZGEtOWZjNy0xMmM2OTgyYTJlNjIiLCJleHAiOjE1NDU3NzgzODAsIm5iZiI6MCwiaWF0IjoxNTQ1NzQyMzgwLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwODAvYXV0aC9yZWFsbXMvdm95YWdlci10ZXN0aW5nIiwiYXVkIjoidm95YWdlci10ZXN0aW5nIiwic3ViIjoiNjdkNGFiNjQtNDgxNS00MzExLWE1OWUtMzAyMDljYjhhYzJjIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoidm95YWdlci10ZXN0aW5nIiwiYXV0aF90aW1lIjoxNTQ1NzQyMzgwLCJzZXNzaW9uX3N0YXRlIjoiYjY4NGEzNDktYmRmNy00MTBjLTkyZWYtOWM4ZjZiZTZkOGI2IiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyIqIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJhZG1pbiIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsidm95YWdlci10ZXN0aW5nIjp7InJvbGVzIjpbImFkbWluIl19LCJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJuYW1lIjoiQWxpIE9rIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiZGV2ZWxvcGVyIiwiZ2l2ZW5fbmFtZSI6IkFsaSIsImZhbWlseV9uYW1lIjoiT2siLCJlbWFpbCI6ImFsaW9rQGFsaW9rLmNvbS50ciJ9.QZ8uiv1Z1gqiDjQAS6gwBsQ-O_YWr-qSI7EDVAhz3irndh5PCSbIfjTAF2EAqJxAZbYxhV3Iih932_5eQkowhKF61Tx5aSA5wY9ELeG2bJ5mU8uTzdnyxWdlPvdbJDpVUeCAxcJLgW8JnkykAQHEUjbVoT87YxxfgFTGmXZwEY4W_Qm8DiE8uqQFLhqdRQunQBLeKxjjPPVBOY7OZk7rlsyxjLS7UVaik4CGmGBYahmbrSivBJujn4jctKdKJ_k7D1UEdZgXeXfe92lDA7GKEheMTcXGDBaXfzKAravmn09hfCqlf6AwUx8_5RyfbN_D5jzEgwFSEY2WvLfClqbjyg';
    options.headers['Authorization'] = 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJRaEZCeEpBd3NSU2s2bzBVZnFiMkVsOE12ek1HS0tYSENFb1c0NmNIX2Q4In0.eyJqdGkiOiJiMTcxYzE3Ni02MDYwLTRjNjMtOWVjYi0wOTYxNjQ3OTAxOTgiLCJleHAiOjE1NDU5Mzg0MTIsIm5iZiI6MCwiaWF0IjoxNTQ1OTAyNDEyLCJpc3MiOiJodHRwczovL2tleWNsb2FrLTdmOGI1Mi1hYWEuYXBwcy5pc3RhbmJ1bC02YjRiLm9wZW5zaGlmdHdvcmtzaG9wLmNvbS9hdXRoL3JlYWxtcy92b3lhZ2VyLXRlc3RpbmciLCJhdWQiOiJ2b3lhZ2VyLXRlc3RpbmciLCJzdWIiOiI1YjY0NzBjOS00NzQ5LTQ3ZjktYWU3OC0xMzU0MGFmZDllMzgiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJ2b3lhZ2VyLXRlc3RpbmciLCJhdXRoX3RpbWUiOjE1NDU5MDI0MTIsInNlc3Npb25fc3RhdGUiOiIxNmMwYWNkYS1iYWNhLTQwNTQtYmUwOC1hMjhkZWQ5MjExYjIiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIioiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwibmFtZSI6IkFsaSBPayIsInByZWZlcnJlZF91c2VybmFtZSI6ImRldmVsb3BlciIsImdpdmVuX25hbWUiOiJBbGkiLCJmYW1pbHlfbmFtZSI6Ik9rIiwiZW1haWwiOiJhbGlva0BhbGlvay5jb20udHIifQ.Az3pYpceZ8r4oLlfkPg7vGrmssKiK2F9x5ysB796VoY9VsqhaxFV9ybqf_BB3-jf5yyeppPRPGWv1IfQIxhNgeTArWCj6t7yCOqQ06tUHowb2ZXoM_gEnkYf0Y43u3ohvLcFwOAp7thrvPEbUwhTzfASgFOWgr0XzBqUHH9KiAAYrJR_YBtc0KFekyrGpZBmmSV1usA_9isFWKlUBNbUQGFL1aNVkZsHIucLdhVJ5RJKStkEQnEAG8BWQXb6EehC_jnqG61zOjEiTc44cWtuxROJQMCXHu9kdiTsoHM9UuymTomotCEQbeVhZC_KhbkRql7ewiMOs_IiyXZkDe27Dw';

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

function createConflict() {
    const query = `
        mutation createConflict {
          createConflict
        }
    `;

    return execute(query, {}, "createConflict");
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
        fails,
        createConflict
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

function createRandomClientInfo(){
    const android = Math.random() < 0.5;

    if(android){
        return {
            "clientId": "client" + Math.ceil(Math.random() * 100 + 1),
            "timestamp": new Date().getTime(),
            "data": {
                "app": {
                    "appId": "io.ionic.starter" + Math.floor(Math.random() * 5 + 1),
                    "appVersion": "0.0." + Math.floor(Math.random() * 5 + 1),
                    "sdkVersion": "2.0." + Math.floor(Math.random() * 3 + 1),
                    "framework": "cordova"
                },
                "device": {
                    "platform": "android",
                    "platformVersion": ["7", "8"][Math.floor(Math.random()*2)],
                    "device": ["HTC One", "LG Nexus 5x"][Math.floor(Math.random()*2)]
                }
            }
        }
    } else {
        return {
            "clientId": "client" + Math.ceil(Math.random() * 100 + 1),
            "timestamp": new Date().getTime(),
            "data": {
                "app": {
                    "appId": "io.ionic.starter" + Math.floor(Math.random() * 5 + 1),
                    "appVersion": "0.0." + Math.floor(Math.random() * 5 + 1),
                    "sdkVersion": "2.0." + Math.floor(Math.random() * 3 + 1),
                    "framework": "cordova"
                },
                "device": {
                    "platform": "ios",
                    "platformVersion": ["4", "5"][Math.floor(Math.random())],
                    "device": ["iPhone 3G", "iPhone 4S"][Math.floor(Math.random()*2)]
                }
            }
        }
    }

}


async function main() {
    while (true) {
        const operation = pickRandomOperation();
        console.log("Executing operation: " + operation.name);
        await operation();
    }
}

main();