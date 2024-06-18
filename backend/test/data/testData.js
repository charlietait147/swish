import bcrypt from 'bcrypt';

const userData = [
    {
        _id: '60f1b6b5f3f9e4f4b8f3b3b1',
        email: 'testUser@gmail.com',
        password: bcrypt.hashSync('testPassword123', 10),
        reviews: []
    },
    {
        _id: '60f1b6b5f3f9e4f4b8f3b3b2',
        email: 'testUser2@gmail.com',
        password: bcrypt.hashSync('testPassword234', 10),
        reviews: []
    }
]

const cafeData = [
    {
        _id: '60f1b6b5f3f9e4f4b8f3b3b4',
        name: 'Test Cafe',
        location: 'Test Location',
        description:'Test Description',
        website: 'test.com',
        image: '/',
        reviews: []
    },
    {
        _id: '60f1b6b5f3f9e4f4b8f3b3b5',
        name: 'Test Cafe 2',
        location: 'Test Location 2',
        description:'Test Description',
        website: 'test.com',
        image: '/',
        reviews: []
    }
]

const reviewData = 
    {
        _id: '60f1b6b5f3f9e4f4b8f3b3b6',
        user: '60f1b6b5f3f9e4f4b8f3b3b1',
        cafe: '60f1b6b5f3f9e4f4b8f3b3b4',
        name: 'Test Review',
        description: 'Test Description',
        likes: 0
    }

const testReviewData = {
    wellFormedReviewData: {
        name: 'Test Review',
        description: 'Test Description'
    },
    reviewNoName: {
        description: 'Test Description'
    }
}


export { userData, cafeData, reviewData, testReviewData };

