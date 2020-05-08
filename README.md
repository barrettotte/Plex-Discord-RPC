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
* configure **config/secrets.js**, rename **config/secrets_template.js**


## PM2
* ```sudo npm install pm2@latest -g```
* ```pm2 start src/plex_discord_rpc.js```
* ```pm2 startup systemd``` -> run generated command
* ```pm2 save```
* ```sudo systemctl start <service>```


## References
* [Unoffical Plex API Documentation](https://github.com/Arcanemagus/plex-api)
* [Plex Icon](https://www.pngkey.com/detail/u2t4o0r5o0e6i1a9_plex-media-server-transparent-plex-icon/)
