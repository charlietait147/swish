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
        lat: 0,
        lng: 0,
        reviews: []
    },
    {
        _id: '60f1b6b5f3f9e4f4b8f3b3b5',
        name: 'Test Cafe 2',
        location: 'Test Location 2',
        description:'Test Description',
        website: 'test.com',
        lat: 0,
        lng: 0,
        image: '/',
        reviews: []
    }
]

const cafeDataToBeDeleted = [
    {
        _id: '60f1b6b5f3f9e4f4b8f3b3b4',
        name: 'Test Cafe',
        location: 'Test Location',
        description:'Test Description',
        website: 'test.com',
        lat: 0,
        lng: 0,
        image: '/',
        reviews: []
    },
    {
        _id: '60f1b6b5f3f9e4f4b8f3b3b5',
        name: 'Test Cafe 2',
        location: 'Test Location 2',
        description:'Test Description',
        website: 'test.com',
        lat: 0,
        lng: 0,
        image: '/',
        reviews: []
    }
]

const reviewData = 
    {
        _id: '60f1b6b5f3f9e4f4b8f3b3b6',
        user: userData[0]._id,
        cafe: cafeData[0]._id,
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
    },
    reviewNoDescription: {
        name: 'Test Review'
    }
}


export { userData, cafeData, reviewData, testReviewData, cafeDataToBeDeleted };

