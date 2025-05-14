let score = 0;
let currentSongIndex = 0;
let isPlaying = false;
let timerStarted = false;
let countdown;
let timeLeft = 30;

const originalSongs = [
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
    options: [`Shut Up`, `Hey Jude`, `Year 3000`, `Hotel California`]
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
  //13
  {
    preview_url: 'songs/last-of-my-kind.mp3',
    name: 'Last of My Kind',
    options: [`Last of My Kind`, `Africa`, `Old Phone`, `Ordinary`]
  },
  //14
  {
    preview_url: 'songs/show-me-love.mp3',
    name: 'Show Me Love',
    options: [`Beautiful Things`, `Unstoppable`, `Sail`, `Show Me Love`]
  },
  //15
  {
  preview_url: 'songs/immortals.mp3',
  name: 'Immortals',
  options: [`Believer`, `Immortals`, `Drops of Jupiter`, `Demons`]
  },
  //16
  {
  preview_url: 'songs/believer.mp3',
  name: 'Believer',
  options: [`Believer`, `Holiday`, `Immortals`, `Warrior`]
  },
  //17
  {
  preview_url: 'songs/thunder.mp3',
  name: 'Thunder',
  options: [`Nice To Meet You`, `Anxiety`, `Thunder`, `Back To Friends`]
  },
//18
  {
  preview_url: 'songs/drops-of-jupiter.mp3',
  name: 'Drops of Jupiter',
  options: [`Mystical Magical`, `Drops of Jupiter`, `Messy`, `Nokia`]
  },
  //19
  {
  preview_url: 'songs/carry-you-home.mp3',
  name: 'Carry You Home',
  options: [`What Was That`, `Carry You Home`, `Bad Dreams`, `Busy Woman`]
  },
  //20
  {
  preview_url: 'songs/trouble.mp3',
  name: '',
  options: [`Wake Me Up`, `Hey Brother`, `Trouble`, `For A Better Day`]
  },
];

let songs = shuffleArray([...originalSongs]);

const audioPlayer = document.getElementById('audio-player');
const audioSource = document.getElementById('audio-source');
const optionsContainer = document.getElementById('options-container');
const nextRoundBtn = document.getElementById('next-round-btn');
const restartBtn = document.getElementById('restart-btn');
const scoreElement = document.getElementById('score');
const timerElement = document.getElementById('timer');
const messageElement = document.getElementById('message');
const playBtn = document.getElementById('play-pause-btn');
const playIcon = document.getElementById('play-icon');
const pauseIcon = document.getElementById('pause-icon');

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

function updateScore() {
  scoreElement.innerText = `Score: ${score}`;
}

function updateTimerDisplay() {
  timerElement.textContent = `Time left: ${timeLeft}s`;
}

function startTimer() {
  timeLeft = 30;
  updateTimerDisplay();
  countdown = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();

    if (timeLeft <= 0) {
      clearInterval(countdown);
      revealAnswer();
      audioPlayer.pause();
      playIcon.style.display = 'inline';
      pauseIcon.style.display = 'none';
    }
  }, 1000);
}

function revealAnswer(selected) {
  const correct = songs[currentSongIndex].name;
  const options = document.querySelectorAll('.option');
  options.forEach(option => {
    if (option.textContent === correct) {
      option.classList.add('correct');
    } else {
      option.classList.add('incorrect');
    }
    option.style.color = 'white';
    option.onclick = null;
  });
  messageElement.innerText = selected ? (selected === correct ? 'Correct!' : 'Wrong!') : "Time's up!";
  nextRoundBtn.style.display = selected === correct ? 'inline-block' : 'none';
  restartBtn.style.display = selected !== correct ? 'inline-block' : 'none';
}

function checkAnswer(guess) {
  clearInterval(countdown);
  revealAnswer(guess);
  if (guess === songs[currentSongIndex].name) {
    score++;
    updateScore();
  } else {
    audioPlayer.pause();
    playIcon.style.display = 'inline';
    pauseIcon.style.display = 'none';
  }
}

function loadSong() {
  clearInterval(countdown);
  timerStarted = false;
  timeLeft = 30;
  updateTimerDisplay();

  const song = songs[currentSongIndex];
  audioSource.src = song.preview_url;
  audioPlayer.load();
  playIcon.style.display = 'inline';
  pauseIcon.style.display = 'none';
  isPlaying = false;

  optionsContainer.innerHTML = '';
  const shuffledOptions = shuffleArray([...song.options]);
  shuffledOptions.forEach(option => {
    const btn = document.createElement('button');
    btn.className = 'option';
    btn.textContent = option;
    btn.onclick = () => checkAnswer(option);
    optionsContainer.appendChild(btn);
  });

  messageElement.textContent = '';
  nextRoundBtn.style.display = 'none';
  restartBtn.style.display = 'none';
}

nextRoundBtn.addEventListener('click', () => {
  currentSongIndex++;
  if (currentSongIndex < songs.length) {
    loadSong();
  } else {
    messageElement.textContent = 'Congratulations, you finished the game!';
    restartBtn.style.display = 'inline-block';
  }
});

restartBtn.addEventListener('click', () => {
  score = 0;
  currentSongIndex = 0;
  songs = shuffleArray([...originalSongs]);
  updateScore();
  loadSong();
});

playBtn.addEventListener('click', () => {
  if (audioPlayer.paused) {
    audioPlayer.play();
    playIcon.style.display = 'none';
    pauseIcon.style.display = 'inline';
    if (!timerStarted) {
      startTimer();
      timerStarted = true;
    }
  } else {
    audioPlayer.pause();
    playIcon.style.display = 'inline';
    pauseIcon.style.display = 'none';
  }
});

loadSong();
updateScore();
