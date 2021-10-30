# systemd

I attempted to get this running in systemd, but I kept getting errors trying
to connect to Discord.

## Error

```
Oct 30 11:45:50 barrett-dev node[46905]: Error: Could not connect
Oct 30 11:45:50 barrett-dev node[46905]:     at Socket.onerror (/home/barrett/repos/Plex-Discord-RPC/node_modules/discord-rpc/src/transpor>
Oct 30 11:45:50 barrett-dev node[46905]:     at Object.onceWrapper (events.js:482:26)
Oct 30 11:45:50 barrett-dev node[46905]:     at Socket.emit (events.js:375:28)
Oct 30 11:45:50 barrett-dev node[46905]:     at emitErrorNT (internal/streams/destroy.js:106:8)
Oct 30 11:45:50 barrett-dev node[46905]:     at emitErrorCloseNT (internal/streams/destroy.js:74:3)
Oct 30 11:45:50 barrett-dev node[46905]:     at processTicksAndRejections (internal/process/task_queues.js:82:21)
```

## Run on Startup - Linux with systemd

- Ensure `src/plex_discord_rpc.js` has executable permissions with `chmod +x src/plex_discord_rpc.js`
- Use template service file [plex-discord-rpc.template.service](plex-discord-rpc.template.service)
  - Change paths if needed for `ExecStart`, `WorkingDirectory`, etc
- Copy service file to systemd `sudo cp plex-discord-rpc.template.service /etc/systemd/system/plex-discord-rpc.service`
- Start service `sudo systemctl start plex-discord-rpc`
- Enable run on boot `sudo systemctl enable plex-discord-rpc`
- View logs `journalctl -u plex-discord-rpc --since 11:00`
