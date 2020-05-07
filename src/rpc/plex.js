const axios = require('axios');
const ip = require('ip');


async function getPlexSession(host, port){
  try{
    const thisIp = ip.address();
    console.log('my ip: ' + thisIp);

    const resp = await axios.get(`http://${host}:${port}/sessions`);

    if(resp['status'] == 200){
      const data = resp['data'];
      console.log(resp);
      if(data['MediaContainer']['size'] == 0){
        return '';
      }
      console.log(data['MediaContainer']);
    }
    console.error('Plex server response status != 200');
  } catch(e){
    console.error(e);
  }
}

module.exports.getPlexSession = getPlexSession;