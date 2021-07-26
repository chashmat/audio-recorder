let device = navigator.mediaDevices.getUserMedia({ audio: true });
let chunks = [];
let recorder;
let startPauseBtn = document.getElementsByClassName("start")[0];
let playBackBtn = document.getElementsByClassName("play")[0];
let stopBtn = document.getElementsByClassName("stop")[0];

device.then(stream => {
      recorder = new MediaRecorder(stream);

      recorder.ondataavailable = ev => {
            chunks.push(ev.data);

            if (recorder.state == 'inactive') {
                  let blob = new Blob(chunks, { type: 'audio/webm' });
                  document.getElementById('audio').innerHTML = `<source id="oggSource" src="${URL.createObjectURL(blob)}" type="audio/ogg"></source>`;
                  chunks = [];
            };
      };
});

startPauseBtn.addEventListener("click", () => {
      if (startPauseBtn.children[0].classList.contains("hide") == false) {
            startPauseBtn.children[0].classList.add("hide");
            startPauseBtn.children[1].classList.remove("hide");
            recorder.start(1000);
      } else {
            startPauseBtn.children[0].classList.remove("hide");
            startPauseBtn.children[1].classList.add("hide");
            recorder.stop();
      };
});