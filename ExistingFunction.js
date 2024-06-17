const { getDb } = require('./db');

async function existingUser(client, username) {
    return await client
        .db('TheDune')
        .collection('users')
        .find({ "username": { $eq: username } })
        .toArray();
}

async function existingItem(client, item_id) {
    return await client
        .db('TheDune')
        .collection('items')
        .find({ "item_id": { $eq: item_id } })
        .toArray();
}

async function existingMonster(client, monster_id) {
    return await client
        .db('TheDune')
        .collection('monster')
        .find({ "monster_id": { $eq: monster_id } })
        .toArray();
}

async function existingWeapon(client, weapon_id) {
    return await client
        .db('TheDune')
        .collection('weapons')
        .find({ "weapon_id": { $eq: weapon_id } })
        .toArray();
}

module.exports = {
    existingUser,
    existingItem,
    existingMonster,
    existingWeapon
};
