'use strict';

const DiscordRPC = require('discord-rpc');
const client = new DiscordRPC.Client({transport: 'ipc'});

const Plex = require('./plex');
const Anilist = require('./anilist');

const config = require('../../config/rpc');
const secrets = require('../../config/secrets');


function buildEpisodeString(session){
  const title = session.episode.title;
  return `S${session.season.padStart(2,'0')}E${session.episode.index.padStart(3,'0')} - ${title}`
}

async function buildRpcData(session){
  var largeText = 'Plex';
  if(session.library.toUpperCase() === 'ANIME'){
    const anime = await Anilist.getAnime(session.title);
    largeText = `anilist.co/anime/${anime['id']}`
  }
  // movie
  if(session.title === '' || session.title === undefined){
    return {
      details: session.episode.title,
      startTimestamp: Date.now(),
      endTimestamp: Date.now() + (session.episode.duration - session.episode.progress),
      largeImageKey: 'plex-lg',
      largeImageText: largeText,
      instance: false,
    } 
  }
  return {
    details: session.title,
    state: buildEpisodeString(session),
    startTimestamp: Date.now(),
    endTimestamp: Date.now() + (session.episode.duration - session.episode.progress),
    largeImageKey: 'plex-lg',
    largeImageText: largeText,
    instance: false,
  }
}

async function update(){
  try{
    const session = await Plex.getPlexSession(secrets.plex.host, secrets.plex.port);
    if(session !== ''){
      const rpcData = await buildRpcData(session);
      client.setActivity(rpcData);
      console.log(`[${new Date().toLocaleTimeString()}] Updated RPC`);
    } else{
      client.clearActivity();
    }
  } catch(e){
    console.error(e);
  }
}

client.login({
  clientId: config.rpc.id, 
  connectionTimeout: config.rpc.connectionTimeout
}).then(() => {
  console.log('Successfully logged in...');
  update();
  setInterval(() => update(), config.rpc.updateInterval);
}).catch((err) => {
  console.error(err)
});
