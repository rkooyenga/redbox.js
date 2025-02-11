/*
ray kooyenga
redbox.js
web audio api red box simulator
no license
'playQuarter();' should do what you want :)
*/

function playRedboxTone(
  frequency1,
  frequency2,
  beepDuration,
  beepCount,
  pauseDuration,
  repeatCount = 1
) {
  const context = new (window.AudioContext || window.webkitAudioContext)();

  function createOscillator(freq, startTime, duration) {
    let osc = context.createOscillator();
    let gainNode = context.createGain();
    osc.frequency.setValueAtTime(freq, context.currentTime);
    osc.type = "sine";
    osc.connect(gainNode);
    gainNode.connect(context.destination);
    gainNode.gain.setValueAtTime(1, startTime);
    gainNode.gain.setValueAtTime(0, startTime + duration);
    osc.start(startTime);
    osc.stop(startTime + duration);
  }

  let startTime = context.currentTime;

  // Loop through chirps and create with pauses in between
  for (let r = 0; r < repeatCount; r++) {
    for (let i = 0; i < beepCount; i++) {
      createOscillator(frequency1, startTime, beepDuration);
      createOscillator(frequency2, startTime, beepDuration);
      startTime += beepDuration + pauseDuration;
    }
    // longer pause between repetitions of the entire sequence
    startTime += 0.5;
  }
}

// Nickel: 1 chirp
function playNickel() {
  playRedboxTone(2200, 1700, 0.066, 1, 0, 1);
}

// Dime: 2 chirps 66ms pause
function playDime() {
  playRedboxTone(2200, 1700, 0.066, 2, 0.066, 1);
}

// Quarter: 5 chirps 33ms pause, repeating
function playQuarter() {
  playRedboxTone(2200, 1700, 0.033, 5, 0.033, 1);
}

// 4 Quarters
function playDollar() {
  playRedboxTone(2200, 1700, 0.033, 5, 0.033, 4);
}
