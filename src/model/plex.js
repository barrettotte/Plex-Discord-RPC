'use strict';

const plexSession = {
  state: 'browsing',      // state: [browsing, watching]
  show:  '',              // show title
  timeWatched: 0,         // seconds
  season:{                // current season
    index: 0,             //   S00
    episodes: 0,          //   episodes in season
  },
  episode:{               // current episode
    index: 0,             //   E00
    length: 0,            //   seconds
    title: '',            //   episode title
  }
};

module.exports = plexSession;