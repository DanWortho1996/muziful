let score = 0;
let currentSongIndex = 0;
let isPlaying = false;
const songs = [
  {
    preview_url: 'songs/azizam.mp3',
    name: 'Azizam',
    options: ['Azizam', 'Drunk Again', 'You Need Me', 'The A Team'],
  },
  {
    preview_url: 'songs/sinner.mp3',
    name: 'Sinner',
    options: ['Mr. Brightside', 'Love The Way You Lie', 'Sinner', 'Gangsta Paradise'],
  },
  {
    preview_url: 'songs/changes.mp3',
    name: 'Changes',
    options: ['Siren', 'Run Boy Run', 'Golden Age', 'Changes'],
  },
];

const audioPlayer = document.getElementById('audio-player');
const audioSource = document.getElementById('audio-source');
const optionsContainer = document.getElementById('options-container');
const nextRoundBtn = document.getElementById('next-round-btn');
const scoreElement = document.getElementById('score');
const messageElement = document.getElementById('message');
const playIcon = document.getElementById('play-icon');
const pauseIcon = document.getElementById('pause-icon');

// Update score display
function updateScore() {
  scoreElement.innerText = `Score: ${score}`;
}

// Load a song and options
function loadSong() {
  const song = songs[currentSongIndex];
  audioSource.src = song.preview_url;
  audioPlayer.load();
  optionsContainer.innerHTML = '';
  song.options.forEach(option => {
    const optionElement = document.createElement('div');
    optionElement.classList.add('option');
    optionElement.innerText = option;
    optionElement.onclick = () => checkAnswer(option);
    optionsContainer.appendChild(optionElement);
  });
  messageElement.innerText = '';
  nextRoundBtn.style.display = 'none';
}

// Toggle play/pause state
audioPlayer.addEventListener('play', () => {
  isPlaying = true;
  playIcon.style.display = 'none';
  pauseIcon.style.display = 'inline';
});

audioPlayer.addEventListener('pause', () => {
  isPlaying = false;
  playIcon.style.display = 'inline';
  pauseIcon.style.display = 'none';
});

// Check if the guess is correct
function checkAnswer(guess) {
  const correctAnswer = songs[currentSongIndex].name;
  if (guess === correctAnswer) {
    score++;
    messageElement.innerText = 'Correct!';
    nextRoundBtn.style.display = 'inline-block';
  } else {
    messageElement.innerText = 'Wrong! Game Over!';
    nextRoundBtn.style.display = 'none';
  }
  updateScore();
}

// Start next round
nextRoundBtn.addEventListener('click', () => {
  currentSongIndex++;
  if (currentSongIndex < songs.length) {
    loadSong();
    playIcon.style.display = 'inline';
    pauseIcon.style.display = 'none';
    isPlaying = false;
  } else {
    messageElement.innerText = 'Congratulations, you finished the game!';
    nextRoundBtn.style.display = 'none';
  }
});

// Handle play/pause icon clicks manually if desired (optional, as this is covered by the audio element)
document.getElementById('play-pause-icon-container').addEventListener('click', () => {
  if (isPlaying) {
    audioPlayer.pause();
  } else {
    audioPlayer.play();
  }
});

loadSong();
