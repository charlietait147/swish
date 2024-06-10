import dotenv from 'dotenv';

dotenv.config({
    path: `.env${process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ``}`,
});

const config = { 
    db: {
        uri: process.env.DBURI
    },
};

export default config;