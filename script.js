let score = 0;
let currentSongIndex = 0;
let isPlaying = false;

const songs = [
  //1
  {
    preview_url: 'songs/azizam.mp3',
    name: 'Azizam',
    options: ['Azizam', 'Drunk Again', 'You Need Me', 'The A Team'],
  },
  //2
  {
    preview_url: 'songs/sinner.mp3',
    name: 'Sinner',
    options: ['Mr. Brightside', 'Love The Way You Lie', 'Sinner', 'Gangsta Paradise'],
  },
  //3
  {
    preview_url: 'songs/changes.mp3',
    name: 'Changes',
    options: ['Siren', 'Run Boy Run', 'Jack & Gill', 'Changes'],
  },
  //4
  {
    preview_url: 'songs/easy.mp3',
    name: 'Easy',
    options: [`Mockingbird`, `Where Is The Love?`, `Easy`, `Heavens`]
  },
  //5
  {
    preview_url: 'songs/never-gonna-give-you-up.mp3',
    name: 'Never Gonna Give You Up',
    options: [`Paid My Dues`, `Never Gonna Give You Up`, `In The Air`, `Comfortably Numb`]
  },
  //6
  {
    preview_url: 'songs/shut-up.mp3',
    name: 'Shut Up',
    options: [`Shut Up`, `Hey Jude`, `Shut Up`, `Hotel California`]
  },
  //7
  {
    preview_url: 'songs/here-comes-the-sun.mp3',
    name: 'Here Comes The Sun',
    options: [`Let It Be`, `Here Comes The Sun`, `Blinding Lights`, `Bullet In A Gun`]
  },
  //8
  {
    preview_url: 'songs/heavens.mp3',
    name: 'Heavens',
    options: [`I.O.U`, `Heavens`, `Smooth Criminal`, `The Hall of Fame`]
  },
  //9
  {
    preview_url: 'songs/temperature.mp3',
    name: 'Temperature',
    options: [`Temperature`, `Mesmerize`, `Castle On The Hill`, `Umbrella`]
  },
  //10
  {
    preview_url: 'songs/stereo-hearts.mp3',
    name: 'Stereo Hearts',
    options: [`Eye Of The Tiger`, `Don't`, `Hello`, `Stereo Hearts`]
  },
  //11
  {
    preview_url: 'songs/in-the-air.mp3',
    name: 'In The Air',
    options: [`Run This Town`, `Can't Hold Us`, `In The Air`, `Take On Me`]
  },
  //12
  {
    preview_url: 'songs/cant-hold-us.mp3',
    name: `Can't Hold Us`,
    options: [`The Business`, `Can't Hold Us`, `Life Is A Highway`, `A Bar Song`]
  },
];

let shuffledSongs = shuffleArray([...songs]);

const audioPlayer = document.getElementById('audio-player');
const audioSource = document.getElementById('audio-source');
const optionsContainer = document.getElementById('options-container');
const nextRoundBtn = document.getElementById('next-round-btn');
const scoreElement = document.getElementById('score');
const messageElement = document.getElementById('message');

// Shuffle helper
function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Update score display
function updateScore() {
  scoreElement.innerText = `Score: ${score}`;
}

// Load the next song
function loadNextSong() {
  if (currentSongIndex >= shuffledSongs.length) {
    messageElement.innerText = 'Congratulations, you finished the game!';
    nextRoundBtn.style.display = 'none';
    return;
  }

  const song = shuffledSongs[currentSongIndex];
  audioSource.src = song.preview_url;
  audioPlayer.load();

  const shuffledOptions = shuffleArray([...song.options]);
  optionsContainer.innerHTML = '';

  shuffledOptions.forEach(option => {
    const btn = document.createElement('button');
    btn.innerText = option;
    btn.onclick = () => checkAnswer(option);
    optionsContainer.appendChild(btn);
  });

  messageElement.innerText = '';
  nextRoundBtn.style.display = 'none';
}

// Check if guess is correct
function checkAnswer(guess) {
  const correctAnswer = shuffledSongs[currentSongIndex].name;
  if (guess === correctAnswer) {
    score++;
    messageElement.innerText = 'Correct!';
    nextRoundBtn.style.display = 'inline-block';
  } else {
    messageElement.innerText = 'Wrong! Game Over!';
    nextRoundBtn.style.display = 'none';
    audioPlayer.pause();
  }
  updateScore();
}

// Next song button
nextRoundBtn.addEventListener('click', () => {
  currentSongIndex++;
  loadNextSong();
});

// Play/pause icon handling
audioPlayer.addEventListener('play', () => {
  isPlaying = true;
});

audioPlayer.addEventListener('pause', () => {
  isPlaying = false;
});

// Start game
updateScore();
loadNextSong();
