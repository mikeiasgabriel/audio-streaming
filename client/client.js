window.onload = main;

let selectedMusicIndex = 0;
const musics = ["dev_cast", "motor_grafico", "design_patterns", "direct"];

const musicsPreview = {
  dev_cast: "devcast.png",
  motor_grafico: "motor_grafico.jpg",
  design_patterns: "design_patterns.jpg",
  direct: "direct.jpg",
};

const leftButton = document.getElementsByClassName("left-button")[0];
const playButton = document.getElementsByClassName("play-button")[0];
const rightButton = document.getElementsByClassName("right-button")[0];
const preview = document.getElementsByClassName("preview")[0];
const audio = document.getElementsByTagName("audio")[0];
const source = document.getElementsByTagName("source")[0];
const slider = document.getElementById("slider");

const states = {
  STOPPED: "stopped",
  PLAYING: "playing",
  PAUSED: "paused",
};

let currentState = states.STOPPED;

function currentMusic() {
  return musics[selectedMusicIndex];
}

function changeMusic(newMusicIndex) {
  if (newMusicIndex < 0) {
    selectedMusicIndex = musics.length - 1;
  } else if (newMusicIndex >= musics.length) {
    selectedMusicIndex = 0;
  } else {
    selectedMusicIndex = newMusicIndex;
  }
  const music = musics[selectedMusicIndex];
  loadPreview(music);
  start(music);
}

function loadPreview(music) {
  const previewAsset = musicsPreview[music];
  preview.style.background = `url('assets/${previewAsset}')`;
}

function changeState(state) {
  switch (state) {
    case states.PLAYING:
      playButton.children[0].setAttribute("src", "assets/pause.svg");
      break;
    case states.PAUSED:
      playButton.children[0].setAttribute("src", "assets/play.svg");
      break;
  }
  currentState = state;
}

function start(music) {
  changeState(states.PLAYING);
  source.src = `http://localhost:8888/${music}`;
  audio.load();
  audio.play();
}

function pause(music) {
  changeState(states.PAUSED);
  audio.pause();
}

function resume() {
  changeState(states.PLAYING);
  audio.play();
}

function onPlayButtonClicked() {
  switch (currentState) {
    case states.PLAYING:
      pause();
      break;
    case states.PAUSED:
      resume();
      break;
    case states.STOPPED:
      start(currentMusic());
      break;
  }
}

function onLeftButtonClicked() {
  changeMusic(selectedMusicIndex - 1);
  changeSlider(0);
}

function onRightButtonClicked() {
  changeMusic(selectedMusicIndex + 1);
  changeSlider(0);
}

function updateProgress() {
  const progress = (audio.currentTime / audio.duration) * 100;
  if (isNaN(progress)) {
    return;
  }
  changeSlider(progress);
}

function changeSlider(percentage) {
  slider.value = percentage;
}

function onSliderChanged() {
  const progress = slider.value / 100;
  audio.currentTime = progress * audio.duration;
}

function main() {
  loadPreview(currentMusic());
  leftButton.addEventListener("click", onLeftButtonClicked);
  playButton.addEventListener("click", onPlayButtonClicked);
  rightButton.addEventListener("click", onRightButtonClicked);
  slider.addEventListener("change", onSliderChanged);
  setInterval(updateProgress, 500);
}
