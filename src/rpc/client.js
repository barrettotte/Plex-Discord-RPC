'use strict';

const DiscordRPC = require('discord-rpc');
const client = new DiscordRPC.Client({transport: 'ipc'});
const Plex = require('./plex');

const config = require('../../config/rpc');
const secrets = require('../../config/secrets');


async function update(){

  const session = await Plex.getPlexSession(secrets.plex.host, secrets.plex.port);
  if(session === ''){
    return console.log('no active sessions');
  }
  return; //
  
  try{
    client.setActivity({
      details: 'Watching K-On!',
      state: 'Season 1',
      partySize: 1,
      partyMax: 12,
      // TODO: startTimestamp
      // TODO: endTimestamp
      largeImageKey: 'plex-lg',
      largeImageText: 'Plex',
      instance: false,
    });
    console.log(`[${new Date().toLocaleTimeString()}] Updated RPC`); // TODO: logger
  } catch(e){
    console.error(e); // TODO: logger
  }
}

client.login({
  clientId: config.rpc.id, 
  connectionTimeout: config.rpc.connectionTimeout
}).then(() => {
  console.log('Successfully logged in...'); // TODO: logger
  update();
  setInterval(() => update(), 25000);
}).catch((err) => {
  console.error(err)
});