# Plex-Discord-RPC

![screenshots/watching.png](screenshots/watching.png)

Use Discord RPC to display local Plex session data.


## Background
I made this for me; it is really only handling my single use case
(Linux environment and a Plex server on local network).

By all means, if someone wants to make this more generic I think they easily could.
But, that's not in the scope for this little side project.

**The only goal is to watch a show on Plex and have it update my Discord activity.**

![screenshots/status.png](screenshots/status.png)


## Approach
I just wanted to do something pretty straightforward, so here it is.

* Hit Plex Web API for list of active sessions on server
* Grab local IP and compare to session IP
* Gather session data for current media
* Update Discord activity/status via Discord RPC with media data
* Provide link to Anilist entry if session is watching entry from library 'Anime'

![screenshots/anilist.png](screenshots/anilist-link.png)


## Setup
* ```npm install```
* rename **config/secrets_template.js** to **config/secrets.js** and configure 


## Run on Startup - Linux Setup with PM2
* ```sudo npm install pm2@latest -g```
* ```pm2 start src/plex_discord_rpc.js```
* ```pm2 startup systemd``` -> run generated command
* ```pm2 save```
* ```sudo systemctl start <service>```


## Run on Startup - Lazy Windows Setup
* There are way better methods to do this, but I'm feeling particularly lazy today; I barely get on Windows anymore.
* Edit **setup/Plex_Discord_RPC.bat** to match current path of repository
* Create shortcut pointing to **setup/Plex_Discord_RPC.bat**
* Copy shortcut to ```%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup```
* If the script fails its not going to start back up. That's another problem for another day.


## References
* [Discord RPC Documentation](https://discord.com/developers/docs/topics/rpc)
* [Unoffical Plex API Documentation](https://github.com/Arcanemagus/plex-api)
* [Plex Icon](https://www.pngkey.com/detail/u2t4o0r5o0e6i1a9_plex-media-server-transparent-plex-icon/)
