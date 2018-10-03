'use strict'

const {createApolloFetch} = require('apollo-fetch');

const uri = 'http://example.com/graphql';
const apolloFetch = createApolloFetch({uri});

apolloFetch.use(({request, options}, next) => {
    if (!options.headers) {
        options.headers = {};  // Create the headers object if needed.
    }
    options.headers['authorization'] = 'abcdefgh123-abcdefgh123';

    next();
});

function graphQlErrorOnPurpose() {
    const query = `
        mutation createMeme($owner: ID!, $photourl: String!) {
          createMeme(owner: $owner, photourl: $photourl) {
              id
              photourl
              likes
              owner {
                id
                displayname
                email
                pictureurl
              }
          }
        }
    `;

    const ownerId = "owner" + Math.ceil(Math.random() * 100 + 1);

    // no photourl
    return execute(query, {owner: ownerId}, "createMeme");
}

function createMemeFail() {
    const query = `
        mutation createMemeFail($owner: ID!, $photourl: String!) {
          createMemeFail(owner: $owner, photourl: $photourl) {
              id
              photourl
              likes
              owner {
                id
                displayname
                email
                pictureurl
              }
          }
        }
    `;

    const ownerId = "owner" + Math.ceil(Math.random() * 100 + 1);
    const photoUrl = "photo" + Math.ceil(Math.random() * 1000 + 1);

    return execute(query, {owner: ownerId, photourl: photoUrl}, "createMemeFail");
}

function fetchMemes() {
    const query = `
        query allMemes {
          allMemes {
            id
            photourl
            likes
            owner {
              id
              displayname
              email
              pictureurl
            }
          }
        }
    `;

    return execute(query, {}, "allMemes");
}

function profile() {
    const query = `
        query profile($email: String!) {
          profile(email:$email){
            id
            email
            displayname
            pictureurl
          }
        }
    `;

    const email = "email" + Math.ceil(Math.random() * 100 + 1);

    return execute(query, {email: email}, "profile");
}

function createMeme() {
    const query = `
        mutation createMeme($owner: ID!, $photourl: String!) {
          createMeme(owner: $owner, photourl: $photourl) {
              id
              photourl
              likes
              owner {
                id
                displayname
                email
                pictureurl
              }
          }
        }
    `;

    const ownerId = "owner" + Math.ceil(Math.random() * 100 + 1);
    const photoUrl = "photo" + Math.ceil(Math.random() * 1000 + 1);

    return execute(query, {owner: ownerId, photourl: photoUrl}, "createMeme");
}

function createProfile() {
    const query = `
        mutation createProfile($email: String!, $displayname: String!, $pictureurl: String!) {
          createProfile(email: $email, displayname: $displayname, pictureurl: $pictureurl) {
            id
            email
            displayname
            pictureurl
          }
        }
    `;

    const email = "email" + Math.ceil(Math.random() * 100 + 1);
    const displayname = "displayname" + Math.ceil(Math.random() * 100 + 1);
    const pictureurl = "pictureurl" + Math.ceil(Math.random() * 1000 + 1);

    return execute(query, {email: email, displayname: displayname, pictureurl: pictureurl}, "createProfile");
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
        fetchMemes, fetchMemes,
        createMeme, createMeme,
        createProfile,
        profile, profile,
        graphQlErrorOnPurpose,
        createMemeFail
    ];
    const randomIndex = Math.floor(Math.random() * operations.length);
    return operations[randomIndex];
    // return createMemeFail;
}


async function main() {
    while (true) {
        const operation = pickRandomOperation();
        console.log("Executing operation: " + operation.name);
        await operation();
    }
}

main();