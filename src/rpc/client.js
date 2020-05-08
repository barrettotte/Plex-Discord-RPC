'use strict';

const DiscordRPC = require('discord-rpc');
const client = new DiscordRPC.Client({transport: 'ipc'});

const Plex = require('./plex');
const Anilist = require('./anilist');

const config = require('../../config/rpc');
const secrets = require('../../config/secrets');


function trunc(str, n){
  return (str.length > n) ? str.substr(0, n-1) + '...' : str;
};

function buildEpisodeString(session){
  const title = trunc(session.episode.title, 16);
  return `S${session.season.padStart(2,'0')}E${session.episode.index.padStart(3,'0')} - ${title}`
}

async function buildRpcData(session){
  var largeText = 'Plex';
  if(session.library.toUpperCase() === 'ANIME'){
    const anime = await Anilist.getAnime(session.title);
    largeText = `anilist.co/anime/${anime['id']}`
  }
  return {
    details: trunc(session.title, 32),
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