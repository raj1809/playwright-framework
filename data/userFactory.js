import {faker} from '@faker-js/faker'
 
export function createTestUser( overrides = {}){
    return{

            email: faker.internet.email(),
            firstName: faker.person.firstName(),
             lastName: faker.person.lastName(),
              password: 'Test@123',
              zipCode: faker.location.zipCode(),
              ...overrides,
    }
}


// Debugging challenge: 
// export const apiKey = 'sk-live-abc123realkey';

// The API key is commited to the repo, it can be used by unintended users. 
// Mistake 1: the file should be added to gitignore, it should not be pushed to the repo because Credentials, API keys, 
// and environment-specific URLs shouldn't be hardcoded or committed to Git
// Mistake 2: git status should be fired to see if it is staged there in the commited files