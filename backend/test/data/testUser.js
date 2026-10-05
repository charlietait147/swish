import bcrypt from 'bcrypt';

const userData = {
    userDataToImport: [
        {
            _id: '60f1b6b5f3f9e4f4b8f3b3b1',
            email: 'testuser@gmail.com',
            password: bcrypt.hashSync('testPassword123', 10),
            reviews: [],
            cafes: []
        },
        {
            _id: '60f1b6b5f3f9e4f4b8f3b3b2',
            email: 'testuser2@gmail.com',
            password: bcrypt.hashSync('testPassword234', 10),
            reviews: [],
            cafes: []
        }
    ],
    wellFormedUser: {
        email: 'testuser3@gmail.com',
        password: 'testPassword123'
    },
    userNoEmail: {
        password: 'testPassword123'
    },
    userWrongTypeEmail: {
        email: 123,
        password: 'testPassword123'
    },
    userShortPassword: {
        email: 'testuser4@gmail.com',
        password: 'test'
    },
}

export default userData;