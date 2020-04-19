'use strict';

const DiscordRPC = require('discord-rpc');

//const config = 
const client = new DiscordRPC.client({transport: 'ipc'});


console.log("hello world");

client.login({clientId: config.rpc.id}).then(() =>{
  setInterval(update, config.rpc.updateInterval);
}).catch((err) => {
  throw err;
});
