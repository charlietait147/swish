import dotenv from 'dotenv';

dotenv.config({
    path: `.env${process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ``}`,
});

const { DBURI } = process.env;

const config = { 
    db: {
        uri: DBURI
    },
};

export default config;