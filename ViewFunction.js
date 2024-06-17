async function viewLeaderboard(client, user_id) {
    try {
        const database = client.db('TheDune');
        const collection = database.collection('transactions');

        const leaderboard = await collection.aggregate([
            { $match: { transaction_type: 'monster_slain' } },
            {
                $group: {
                    _id: '$user_id',
                    total_monsters_slain: { $sum: 1 }
                }
            },
            { $sort: { total_monsters_slain: -1 } },
            { $limit: 10 }
        ]).toArray();

        return leaderboard;
    } catch (error) {
        console.error('Error retrieving leaderboard:', error);
        throw error;
    }
}

async function viewUserByAdmin(client, user_id) {
    try {
        const database = client.db('TheDune');
        const collection = database.collection('users');

        const user = await collection.findOne({ user_id });
        if (!user) {
            return null; // User not found
        }

        // Masking sensitive data for security reasons
        const userSafeData = {
            username: user.username,
            email: user.email,
            role: user.role,
            profile: {
                level: user.profile.level,
                experience: user.profile.experience
            }
        };

        return userSafeData;
    } catch (error) {
        console.error('Error retrieving user by admin:', error);
        throw error;
    }
}

module.exports = {
    viewLeaderboard,
    viewUserByAdmin
};
