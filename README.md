# Plex-Discord-RPC

Use Discord RPC to display local Plex session data.


## Background
I made this for me; it is really only handling my single use case
(Linux environment and a Plex server on local network).

By all means, if someone wants to make this more generic I think they easily could.
But, that's not in the scope for this little side project.

**The only goal is to watch a show on Plex and have it update my Discord activity.**


## Approach
I just wanted to do something pretty straightforward, so here it is.

* Hit Plex Web API for list of active sessions on server
* Grab local IP and compare to session IP
* Gather session data for current media
* Update Discord activity/status via Discord RPC with media data
* Provide link to Anilist entry if session is watching entry from library 'Anime'


## Setup
* configure **config/secrets.js**, rename **config/secrets_template.js**
* TODO: run as daemon? run when discord starts?


## References
* [Unoffical Plex API Documentation](https://github.com/Arcanemagus/plex-api)
* [Plex Icon](https://www.pngkey.com/detail/u2t4o0r5o0e6i1a9_plex-media-server-transparent-plex-icon/)
