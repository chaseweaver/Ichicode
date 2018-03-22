# Ichicode
Ichicode is a multi-purpose mod / stat / fun / music / shitposting Discord bot!

# Commands
* BOT
  * botavatar       : Sets the bot's avatar.
  * nickname        : Sets the bot's nickname.
  * dm              : DMs a user.
  * presence        : Sets the bot's Discord presence.
* GUILD
  * age             : View the age of the guild / member / channel / role.
  * channels        : Displays channel listings.
  * chat            : Send a chat between channels.
  * id              : Returns the ID of the guild / member / channel / role.
  * membercount     : Returns the total members within a guild / role.
  * memberlist      : DMs a list of members and member IDs.
  * roleinfo        : Fetches role permissions and info
  * server          : Displays basic server information. 
* MASTER
  * eval            : Evaluates an expression.
  * exec            : Executes an expression.
* MISC
  * ascii           : Sends ascii art to a channel.
  * avatar          : Fetches the mentioned member's avatar.
  * caps            : rEtUrNs TeXt LiKe ThIs To A cHaNnEl.
  * shame           : SHAME. SHAME.
  * shameban        : BAN. BAN.
* MOD
  * ban             : Bans a mentioned member.
  * info            : Fetches info about a member.
  * kick            : Kicks a mentioned member.
  * lock            : Locks a channel.
  * mute            : Mutes a member.
  * prune           : Prunes messages in a channel with filter.
  * role            : Adds / Removes roles from mentioned member.
  * speak           : Has the bot speak in voice channel usign Google TTS.
  * unlock          : Unlocks a channel.
  * unmute          : Unmutes a mentioned member.
* MUSIC
  * add             : Adds a YouTube URL / ID / Search Term / uploaded music file to the music queue.
  * end             : Ends the currently playing song.
  * join            : Have the bot join the author's current voice channel.
  * leave           : Has the bot leave a voice channel.
  * lyrics          : Scrapes AZLyrics for song lyrics.
  * nowplaying      : Display the currently playing song.
  * pause           : Pause the currently playing song.
  * play            : Auto joins a voice channel and plays the first song in queue.
  * queue           : Lists the song queue.
  * remove          : Removes a songs from the queue if you queued it.
  * resume          : Resumes the currently playing song.
  * skip            : Skips the currently playing song.
  * time            : Returns the remaining time left in the song.
  * volume          : Adjusts stream volume (not client volume).
* STATS
  * membersjoined   : Returns members joined over a time period.
  * messages        : Returns message counts per channel / member.
  * rolemembercount : Returns members in a role.

# Events
* debug             : Logs debug info.
* error             : Logs error info.
* guildCreate       : Logs guild add info.
* guildDelete       : Logs guild delete info.
* guildMemberAdd    : Logs guild member add info.
* guildMemberRemove : Logs guild member remove info.
* ready             : Logs ready info.

# Monitors
* antispam          : Prevents chat spamming guild wide.
* dadjoke           : "I'm Chase" "Hi, Chase, I'm Ichicode!"
* wakemeup          : "Wake me up inside!"
* what              : "WHAT"

# Invite Link
Maybe some day.

# How to Run
1. Create a new 'app' from https://discordapp.com/developers/applications/me
2. Give it a fancy name / picture / description.
3. Click 'Create Bot User'.
4. Download this repo.
5. Modify 'config.ex.js' with 'config.js' and enter in your tokens.
6. Inside your newly created file, add your Discord bot token / your profile ID obtained from the 'app' page you just created.
7. Run $ npm install
8. Run $ node <YOUR_FILENAME_HERE>
9. Enjoy!