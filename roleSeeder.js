/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
import roleModel from './src/models/role.model.js';
import { config } from 'dotenv';
import dbConnect from './src/config/db.js';
config();

const roles = [
    { title: 'Admin' },
    { title: 'Branch-Head' },
    { title: 'Area-Manager' }
];

const seedRoles = async () => {
    try {
        await dbConnect(process.env.MONGO_URL);
        // Nai roles insert karna
        await roleModel.insertMany(roles);
        console.log('Roles seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding roles:', error);
        process.exit(1);
    }
};

seedRoles();
