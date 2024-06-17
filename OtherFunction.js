async function monsterslain(client, user_id, date) {
    try {
        const database = client.db('TheDune');
        const collection = database.collection('transactions');

        // Create a transaction object for a slain monster
        const transaction = {
            user_id: user_id,
            transaction_type: 'monster_slain',
            date: date
        };

        // Insert the transaction object into the collection
        await collection.insertOne(transaction);
        console.log("Monster slain recorded successfully");
    } catch (error) {
        console.error("Error recording monster slain:", error);
    }
}

async function deleteUser(client, user_id) {
    try {
        const database = client.db('TheDune');
        const collection = database.collection('users');

        // Delete the user based on their user_id
        const result = await collection.deleteOne({ user_id: user_id });
        return result;
    } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
    }
}

async function reportUser(client, user_id) {
    try {
        const database = client.db('TheDune');
        const collection = database.collection('transactions');
        const userTransactions = await collection.find({ user_id: user_id }).toArray();
        return userTransactions;
    } catch (error) {
        console.error('Error finding transactions by user_id:', error);
        throw error;
    }
}

module.exports = {
    monsterslain,
    deleteUser,
    reportUser
};
