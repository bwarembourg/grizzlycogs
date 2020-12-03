var confettisTracks = [
  '01. Landing... ',
  '02. Confettis',
  '03. Prune & Milo',
  '04. We tried',
  '05. I miss Home',
  '06. Eating apples at parties',
  '07. Lights',
  '08. Dancefloor ghosts (part. 1)',
  '09. Dancefloor ghosts (part. 2)',
  '10. Thankful to be back in your arms',
  '11. Lo\'s dreams'
];

var deltaplaneTracks = [
  '01. Still No Plan',
  '02. Grizzly kids (feat. Vault Kid)',
  '03. Deltaplane',
  '04. Take care',
  '05. Regular Pain',
  '06. Everything looks so tiny from here',
  '07. There\'s still hope',
  '08. Farewell Hug',
  '09. Berlin',
  '10. Volcano on the Moon'
];

var tracks = [];
var playListTitle = '';
var audio;
var idPlaying = 1;
var playlistShown = false;
var artcover = '';
var albumname = '';

function showLoadAndPlay(title) {
  loadPlaylist(title);
  globalPlay();
}

function loadPlaylist(title) {
  playListTitle = title;
  idPlaying = 1;
  switch(title) {
    case 'deltaplane': 
      tracks = deltaplaneTracks; 
      artcover = 'img/album-deltaplane.jpg'; 
      albumname = 'Deltaplane (2019)'
      break;
    default: 
      tracks = confettisTracks; 
      artcover = 'img/album-confettis.jpg'; 
      albumname = 'Confettis (2020)'
      break;
  }
}

function play(id) {
  document.getElementById('globalPlay').style.display = 'none';
  document.getElementById('globalPause').style.display = 'block';
  if (audio) {
    globalPause();
  }
  document.getElementById('globalPlay').style.display = 'none';
  document.getElementById('globalPause').style.display = 'block';
  src = 'audio/' + playListTitle + '/' + tracks[id - 1] + '.mp3';
  document.getElementById('nowplaying').innerText = src.split('/')[2].split('.mp3')[0];
  idPlaying = id;
  audio = new Audio(src);
  audio.play();
  audio.onended = function () {
    next();
  }
  refreshPlaylist();
}

function globalPause() {
  document.getElementById('globalPlay').style.display = 'block';
  document.getElementById('globalPause').style.display = 'none';
  document.getElementById('nowplaying').innerText = '-----';
  audio.pause();
}

function globalPlay() {
  if (tracks.length == 0) {
    loadPlaylist('confettis');
  }
  play(idPlaying);
}

function globalStop() {
  globalPause();
  idPlaying = 1;
  refreshPlaylist();
}


function next() {
  if (audio) {
    globalPause();
  }
  idPlaying++;
  if(idPlaying > tracks.length) {
    idPlaying = 1;
  }
  play(idPlaying);
}

function previous() {
  if (audio) {
    globalPause();
  }
  idPlaying--;
  if (idPlaying <= 0) {
    idPlaying = tracks.length;
  }	
  play(idPlaying);
}

function showPlaylist() {
  playlistShown = !playlistShown;
  var playlist = document.getElementById('globalPlaylist');
  playlist.style.display = playlistShown ? 'flex' : 'none';
  document.getElementById('miniplayer').style.bottom = playlistShown ? '150px' : '0px';
  if (tracks.length == 0) {
    loadPlaylist('confettis');
  }
  refreshPlaylist();
}

function refreshPlaylist() {
  document.getElementById('albumart').src = artcover;
  document.getElementById('albumname').innerText = albumname;
  var playlist = document.getElementById('playlist');
  playlist.innerHTML = '';
  for(var i= 0; i< tracks.length; i++) {
    var trackNo = tracks[i].split('.')[0];
    var trackName = tracks[i].split('.')[1];
    var playing = ' not-playing';
    if (idPlaying - 1 == i) {
      trackNo = '<i class="fas fa-play"></i>'
      playing = ' playing';
    }
    var idToPlay = i + 1;
    playlist.innerHTML += '<div class="track" onclick="play(' + idToPlay + ')"><div class="trackno'+ playing + '">' + trackNo + '</div><div class="trackname' + playing + '">' + trackName + '</div></div>';
  }
}