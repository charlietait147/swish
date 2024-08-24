import bcrypt from 'bcrypt';

const userData = {
    userDataToImport: [
        {
            _id: '60f1b6b5f3f9e4f4b8f3b3b1',
            email: 'testUser@gmail.com',
            password: bcrypt.hashSync('testPassword123', 10),
            reviews: [],
            cafes: []
        },
        {
            _id: '60f1b6b5f3f9e4f4b8f3b3b2',
            email: 'testUser2@gmail.com',
            password: bcrypt.hashSync('testPassword234', 10),
            reviews: [],
            cafes: []
        }
    ],
    wellFormedUser: {
        email: 'testUser3@gmail.com',
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
        email: 'testUser4@gmail.com',
        password: 'test'
    },
}

export default userData;