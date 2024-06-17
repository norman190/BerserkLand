async function findUserByUsername(client, username) {
    try {
        const database = client.db('TheDune');
        const collection = database.collection('users');

        // Find the user by username
        const user = await collection.findOne({ username });

        return user;
    } catch (error) {
        console.error('Error finding user by username:', error);
        throw error;
    }
}

async function findUserById(client, user_id) {
    try {
        const database = client.db('TheDune');
        const collection = database.collection('users');

        // Find the user by user_id
        const user = await collection.findOne({ user_id });
        return user;
    } catch (error) {
        console.error("Error finding user by user_id:", error);
        throw error;
    }
}

module.exports = {
    findUserByUsername,
    findUserById
};
