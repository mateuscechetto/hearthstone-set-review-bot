/**
 * Adds the view count of all twitch accounts logged into the platform.
 * Run every day during pre expansion season.
 * Skips accounts that had their view count added already.
 * Skips accounts with non-Latin alphabet letters.
 */

const User = require("../../models/user");
const mongoose = require('../../database/database');

const axios = require('axios');


async function addFollowersToUser() {
    const users = await User.find().lean();

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    for (const user of users) {
        if (user.hasUpdatedFollowersCount || !user.image || (user.followers && user.followers > 0)) {
            continue;
        }
        const username = user.name;
        const apiUrl = `https://twitchtracker.com/api/channels/summary/${username}`;

        try {
            const response = await axios.get(apiUrl);


            const followerCount = response.data?.followers_total;

            if (followerCount) {
                await User.updateOne({ name: username }, { $set: { followers: followerCount, hasUpdatedFollowersCount: true } });
                console.log(`Follower count for user ${username}: ${followerCount}`);
            } else {
                await User.updateOne({ name: username }, { $set: { followers: 0, hasUpdatedFollowersCount: true } });
                console.log(`Follower count for user ${username}: ${0}`);
            }

            await delay(5000);
        } catch (e) {
            console.log(username, e.message)
            continue;
        }
    }

    console.log("finished");
    // Disconnect from MongoDB
    await mongoose.disconnect();

};

addFollowersToUser();