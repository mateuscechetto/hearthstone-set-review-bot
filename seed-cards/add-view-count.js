const User = require("../models/user");
const axios = require('axios');


async function addFollowersToUser() {
    const users = await User.find({name: 'SidisiTV'}).lean();


    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    for (const user of users) {
        const username = user.name;
        const apiUrl = `https://twitchtracker.com/api/channels/summary/${username}`;

        const response = await axios.get(apiUrl);


        const followerCount = response.data?.followers_total;
        
        if (followerCount) {
            await User.updateOne({ name: username }, { $set: { followers: followerCount } });
            console.log(`Follower count for user ${username}: ${followerCount}`);
        } else {
            await User.updateOne({ name: username }, { $set: { followers: 0 } });
            console.log(`Follower count for user ${username}: ${0}`);
        }

        await delay(5000); 
    }

};

addFollowersToUser();