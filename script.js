const videoOne = document.getElementById('video-one');
const videoTwo = document.getElementById('video-two');
const play = document.getElementById('play');
const stop = document.getElementById('stop');
const progress = document.getElementById('progress');
const timestamp = document.getElementById('timestamp');
const opacityRange = document.getElementById('opacityRange');

window.addEventListener('load', () => {
    opacityRange.value = 50;
})

// Play & pause video
function toggleVideoStatus() {
    if (videoOne.paused) {
        videoOne.play();
        videoTwo.play();
    } else {
        videoOne.pause();
        videoTwo.pause();
    }
}

// Update play/pause icon
function updatePlayIcon() {
    if(videoOne.paused) {
        play.innerHTML = '<i class="fa fa-play fa-2x"></i>';
    } else {
        play.innerHTML = '<i class="fa fa-pause fa-2x"></i>';
    }
}

// Update progress & timestamp
function updateProgress() {
    progress.value = (videoOne.currentTime / videoOne.duration) * 100;
 
    // Get the minutes
    let mins = Math.floor(videoOne.currentTime / 60);
    if (mins < 10) {
        mins = '0' + String(mins);
    }

    let secs = Math.floor(videoOne.currentTime % 60);
    if (secs < 10) {
        secs = '0' + String(secs);
    }

    timestamp.innerHTML = `${mins}:${secs}`;
}

// Set video time to progress
function setVideoProgress() {
    videoOne.currentTime = (+progress.value * videoOne.duration) / 100;
    videoTwo.currentTime = (+progress.value * videoTwo.duration) / 100;
}

// Stop video
function stopVideo() {
    videoOne.currentTime = 0;
    videoTwo.currentTime = 0;
    videoOne.pause();
    videoTwo.pause();
}

// Set opacity  && volume for videos
function setOpacity() {
    // If range is set exactly in middle
    if (opacityRange.value === 50) {
        videoOne.style.opacity = 50 + "%";
        videoTwo.style.opacity = 50 + "%";

        // change volumes
        videoOne.volume = 1;
        videoTwo.volume = 1;
    }

    // If opacity range is beneath 50, videoOne is priority
    if (opacityRange.value < 50) {
        // set opacity for both videos
        videoOne.style.opacity = 100 - opacityRange.value + "%";
        videoTwo.style.opacity = opacityRange.value + "%";
        // set volume for video two
        videoOne.volume = 1;
        videoTwo.volume = opacityRange.value / 50;
        
    // if opacity range is above 50, videoTwo is priority
    } else if (opacityRange.value > 50) {
        // set video two opacity to
        videoTwo.style.opacity = opacityRange.value + "%";
        videoOne.style.opacity = (100 - opacityRange.value) + "%";

        // set volumes
        videoTwo.volume = 1;
        // set videoOne volume to decrease from range 50 to range 100;
        videoOne.volume = (100 - opacityRange.value) * 0.02;
    }
};

// Event listeners
videoOne.addEventListener('click', toggleVideoStatus);
videoOne.addEventListener('pause', updatePlayIcon);
videoOne.addEventListener('play', updatePlayIcon);
videoOne.addEventListener('timeupdate', updateProgress);
videoTwo.addEventListener('click', toggleVideoStatus);
videoTwo.addEventListener('pause', updatePlayIcon);
videoTwo.addEventListener('play', updatePlayIcon);
videoTwo.addEventListener('timeupdate', updateProgress);
play.addEventListener('click', toggleVideoStatus);
stop.addEventListener('click', stopVideo);
progress.addEventListener('change', setVideoProgress);
opacityRange.addEventListener('input', setOpacity);