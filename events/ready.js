const { ErelaClient, Utils } = require('erela.js');

module.exports = (client) => {
	console.log("Museum Open");

	// Guild Settings
	client.getSetting = UserSQL.prepare("SELECT * FROM guild_settings WHERE id = ?");
	client.setSetting = UserSQL.prepare("INSERT OR REPLACE INTO guild_settings (id, lvl_up, prefix, music_channel, misc_channel, fun_channel) VALUES (@id, @lvl_up, @prefix, @music_channel, @misc_channel, @fun_channel);");

	//User Islands
	client.getIsland = UserSQL.prepare("SELECT * FROM islands WHERE id = ?");
	client.setIsland = UserSQL.prepare("INSERT OR REPLACE INTO islands (id, character, name, fruit, hemisphere, turnip_price, dodo_code, dodo_time) VALUES (@id, @character, @name, @fruit, @hemisphere, @turnip_price, @dodo_code, @dodo_time);");

	//User Friendcode
	client.getFC = UserSQL.prepare("SELECT * FROM friendcode WHERE id = ?");
	client.setFC = UserSQL.prepare("INSERT OR REPLACE INTO friendcode (id, name, code) VALUES (@id, @name, @code);");

	// Lookup
	client.getVillager = DataSQL.prepare("SELECT * FROM villager WHERE name LIKE ?");

	setInterval(() => {
		const promises = [
			client.shard.fetchClientValues('users.cache.size'),
			client.shard.fetchClientValues('guilds.cache.size'),
		];

		Promise.all(promises)
			.then(results => {
				activitiesList = [
					'with fish!',
					'not with bugs!',
					'monopoly with Tom Nook!',
					'hide and seek with Beau!'
				];
				index = Math.floor(Math.random() * activitiesList.length);

				// Setting activity
				client.user.setActivity(activitiesList[index]);
			})
			.catch((e) =>
				console.log(`[Shard ${client.guilds.cache.first().shardID}] ${e}`)
			);
	}, 30000);
}
