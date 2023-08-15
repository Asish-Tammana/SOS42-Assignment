const synth = window.speechSynthesis;

const userInput = document.getElementById("userInput");
const languageSelect = document.getElementById("languageSelect");
const listenBtn = document.getElementById("listenBtn");
const rate = document.getElementById("rate");
const pitch = document.getElementById("pitch");
const volume = document.getElementById("volume");
let voices;
function loadVoices() {
  voices = synth.getVoices();
  for (let i = 0; i < voices.length; i++) {
    const option = document.createElement("option");
    const optionName = voices[i].name.substring(voices[i].name.indexOf(" ") + 1);
    option.textContent = optionName;
    option.value = i;
    languageSelect.appendChild(option);
  }
}

if ("onvoiceschanged" in synth) {
  synth.onvoiceschanged = loadVoices;
} else {
  loadVoices();
}

listenBtn.onclick = (event) => {
  const utterThis = new SpeechSynthesisUtterance(userInput.value);
  utterThis.voice = voices[languageSelect.value];
    utterThis.pitch = pitch.value;
    utterThis.rate = rate.value;
    utterThis.volume = volume.value;
  synth.speak(utterThis);
  userInput.blur();
};
