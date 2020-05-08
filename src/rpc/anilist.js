'use strict';

const axios = require('axios');

async function getAnime(title){
  const resp = await axios.post(`https://graphql.anilist.co`, {
    query: `{Media(search:\"${title}\" type:ANIME){id title{english}}}`
  }, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if(resp['status'] === 200){
    return resp['data']['data']['Media'];
  }
  throw new Error('Anilist response status != 200');
}

module.exports.getAnime = getAnime;