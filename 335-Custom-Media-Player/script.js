var vidsources = [ "https://mainline.i3s.unice.fr/mooc/week2p1/video2.mp4"
                ,"https://mainline.i3s.unice.fr/mooc/week2p1/video1.mp4" 
                ,"https://mainline.i3s.unice.fr/mooc/week2p1/video3.mp4"
                ,"https://mainline.i3s.unice.fr/mooc/week2p1/video4.mp4"
              ];

var imgsources = [ "https://mainline.i3s.unice.fr/mooc/week2p1/caminandes-2.jpg"
                ,"https://mainline.i3s.unice.fr/mooc/week2p1/caminandes-1.jpg" 
                ,"https://mainline.i3s.unice.fr/mooc/week2p1/big-buck-bunny.jpg"
                ,"https://mainline.i3s.unice.fr/mooc/week2p1/sintel.jpg"
              ];

var imgalts = [ "Koro the Llama Crossing a Desolate Road"
                ,"Koro the Llama In Front of a Fence" 
                ,"Big Buck Bunny in a Grassy Meadow"
                ,"Sintel and Scales"
              ];

var imgtitles = [ "Caminandes Ep. 1: Llama Drama"
                ,"Caminandes Ep. 2: Gran Dillama" 
                ,"Big Buck Bunny"
                ,"Sintel"
              ];

var imgcaptions = [ "Koro the Llama has trouble crossing an apparent desolate road, a problem that an unwitting Armadillo does not share."
                ,"Koro hunts for food on the other side of a fence and is once again inspired by the Armadillo but this time to a shocking effect."
                ,"A large and lovable rabbit deals with three tiny bullies, led by a flying squirrel, who are determined to squelch his happiness."
                ,"A lonely young woman, Sintel, helps and befriends a dragon, whom she calls Scales. But when he is kidnapped by an adult dragon, Sintel decides to embark on a dangerous quest to find her lost friend Scales."
              ];

var mainVid;
var disImage;
var disCaption;
var vidTitle;

var curIdx = (vidsources.length - 1);
var prevIdx;
var nextIdx;

var previousVid;
var previousVidCanv;
var previousVidCanvCtx;

var nextVid;
var nextVidCanv;
var nextVidCanvCtx;

function init() {
  disImage = document.getElementById("vidimg");
  disCaption = document.getElementById("vidcap");
  vidTitle = document.getElementById("vidtitle");

  mainVid = document.getElementById("mainVid");

  mainVid.addEventListener("ended", loadAndplayNextVideo, false);
  mainVid.addEventListener("loadedmetadata", setCanvasSizeAndPosition, false);

  previousVid = document.getElementById("previousVid");
  previousVidCanv = document.getElementById("previousVidCanv");
  previousVidCanvCtx = previousVidCanv.getContext("2d");

  nextVid = document.getElementById("nextVid");
  nextVidCanv = document.getElementById("nextVidCanv");
  nextVidCanvCtx = nextVidCanv.getContext("2d");

  previousVidCanv.addEventListener("click", loadAndplayPreviousVideo, false);
  previousVidCanv.addEventListener("mouseover", function() {previousVidCanv.style.opacity = 0.75; previousVidCanv.style.transition = "all 0.5s ease-in-out";}, false);
  previousVidCanv.addEventListener("mouseout", function() {previousVidCanv.style.opacity = 0; previousVidCanv.style.transition = "all 0.5s ease-in-out";}, false);

  nextVidCanv.addEventListener("click", loadAndplayNextVideo, false);
  nextVidCanv.addEventListener("mouseover", function() {nextVidCanv.style.opacity = 0.75; nextVidCanv.style.transition = "all 0.5s ease-in-out";}, false);
  nextVidCanv.addEventListener("mouseout", function() {nextVidCanv.style.opacity = 0; nextVidCanv.style.transition = "all 0.5s ease-in-out";}, false);

  setInterval("renderCanvasImage()", 25);
  
  loadAndplayNextVideo();
}

function loadNextVideo() {
  if (curIdx < (vidsources.length - 1)) {
    curIdx++;
  }
  else {
    curIdx = 0;
  }

  if (curIdx == (vidsources.length - 1)) {
    prevIdx = (curIdx - 1);
    nextIdx = 0;
  }
  else if (curIdx == 0) {
    prevIdx = (vidsources.length - 1);
    nextIdx = (curIdx + 1);
  }
  else {
    prevIdx = (curIdx - 1);
    nextIdx = (curIdx + 1);
  }

  mainVid.src = vidsources[curIdx];
  mainVid.preload = "auto";
  mainVid.load();

  previousVid.src = vidsources[prevIdx];
  previousVid.preload = "auto";
  previousVid.load();

  nextVid.src = vidsources[nextIdx];
  nextVid.preload = "auto";
  nextVid.load();

  disImage.setAttribute('src', imgsources[curIdx]);
  disImage.setAttribute('alt', imgalts[curIdx]);
  disImage.setAttribute('title', imgtitles[curIdx]);

  disCaption.innerHTML = imgcaptions[curIdx];
  vidTitle.innerHTML = imgtitles[curIdx];
  
  console.log("curIdx Value: " + curIdx.toString());
}

function loadPreviousVideo() {
  if (curIdx > 0) {
    curIdx--;
  }
  else {
    curIdx = (vidsources.length - 1);
  }

  if (curIdx == (vidsources.length - 1)) {
    prevIdx = (curIdx - 1);
    nextIdx = 0;
  }
  else if (curIdx == 0) {
    prevIdx = (vidsources.length - 1);
    nextIdx = (curIdx + 1);
  }
  else {
    prevIdx = (curIdx - 1);
    nextIdx = (curIdx + 1);
  }

  mainVid.src = vidsources[curIdx];
  mainVid.preload = "auto";
  mainVid.load();

  previousVid.src = vidsources[prevIdx];
  previousVid.preload = "auto";
  previousVid.load();

  nextVid.src = vidsources[nextIdx];
  nextVid.preload = "auto";
  nextVid.load();

  disImage.setAttribute('src', imgsources[curIdx]);
  disImage.setAttribute('alt', imgalts[curIdx]);
  disImage.setAttribute('title', imgtitles[curIdx]);

  disCaption.innerHTML = imgcaptions[curIdx];
  vidTitle.innerHTML = imgtitles[curIdx];

  console.log("curIdx Value: " + curIdx.toString());
}

function loadAndplayNextVideo() {
  console.log("Currently playing " + vidsources[curIdx]);
  loadNextVideo();
  mainVid.play();

  previousVid.play();
  nextVid.play();

  document.getElementById("PP").setAttribute('data-icon', '>');
  document.getElementById("PP").setAttribute('title', 'Pause');
  document.getElementById("PP").setAttribute('aria-label', 'Pause');

  setCanvasSizeAndPosition();
}

function loadAndplayPreviousVideo() {
  console.log("Currently playing " + vidsources[curIdx]);
  loadPreviousVideo();
  mainVid.play();

  previousVid.play();
  nextVid.play();

  document.getElementById("PP").setAttribute('data-icon', '>');
  document.getElementById("PP").setAttribute('title', 'Pause');
  document.getElementById("PP").setAttribute('aria-label', 'Pause');

  setCanvasSizeAndPosition();
}

function fastForward() {
  mainVid.currentTime += 10;
  console.log("Video's currentTime Value: " + mainVid.currentTime);
}

function rewind() {
  mainVid.currentTime -= 10;
  console.log("Video's currentTime Value: " + mainVid.currentTime);
}

function playPause() {
  ppBtn = document.getElementById("PP");

  console.log("Current Play / Pause Button Icon: " + ppBtn.getAttribute('data-icon'));

  if (mainVid.paused) {
    ppBtn.setAttribute('data-icon', '>');
    ppBtn.setAttribute('title', 'Pause');
    ppBtn.setAttribute('aria-label', 'Pause');
    mainVid.play();
  } else {
    ppBtn.setAttribute('data-icon','$');
    ppBtn.setAttribute('title', 'Play');
    ppBtn.setAttribute('aria-label', 'Play');
    mainVid.pause();
  }
}

function muteUnmute() {
  muBtn = document.getElementById("MU");

  console.log("Current Mute / Unmute Button Icon: " + muBtn.getAttribute('data-icon'));

  if (mainVid.muted) {
    muBtn.setAttribute('data-icon','E');
    muBtn.setAttribute('title', 'Mute');
    muBtn.setAttribute('aria-label', 'Mute');
    mainVid.muted = false;
  } else {
    muBtn.setAttribute('data-icon','g');
    muBtn.setAttribute('title', 'Unmute');
    muBtn.setAttribute('aria-label', 'Unmute');
    mainVid.muted = true;
  }
}

function enableDisableVideoControls() {
  vcBtn = document.getElementById("VC");

  if (mainVid.controls) {
    mainVid.controls = false;
    vcBtn.setAttribute('title', 'Enable Video Control Overlay');
    vcBtn.setAttribute('aria-label', 'Enable Video Control Overlay');
    vcBtn.style.textDecoration = "none";
  }
  else {
    mainVid.controls = true;
    vcBtn.setAttribute('title', 'Disable Video Control Overlay');
    vcBtn.setAttribute('aria-label', 'Disable Video Control Overlay');
    vcBtn.style.textDecoration = "line-through";
    vcBtn.style.color = "goldenrod";
  }
}

function setCanvasSizeAndPosition() {
  var mainVidCoord = mainVid.getBoundingClientRect(); 

  console.log("--------------------------------------------------");
  console.log("Video Actual Top (Y) Coordinate: " + mainVidCoord.top.toString());
  console.log("Video Actual Left (X) Coordinate: " + mainVidCoord.left.toString());
  console.log("Video Actual Bottom Coordinate: " + mainVidCoord.bottom.toString());
  console.log("Video Actual Right Coordinate: " + mainVidCoord.right.toString());
  console.log("Video Actual Width: " + mainVidCoord.width.toString());
  console.log("Video Actual Height: " + mainVidCoord.height.toString());

/*--------------------------------------------------*/
  previousVidCanv.width = mainVidCoord.width / 4;
  previousVidCanv.height = mainVidCoord.height / 4;

  previousVidCanv.style.position = "absolute";
  previousVidCanv.style.top = "0px";
  previousVidCanv.style.left = "10px";
  previousVidCanv.style.display = "block";
  previousVidCanv.style.backgroundColor = "cornsilk";
  previousVidCanv.style.zindex = 100;
  previousVidCanv.style.borderRadius = "10px";

  previousVidCanv.style.opacity = 0;

/*--------------------------------------------------*/
  nextVidCanv.width = mainVidCoord.width / 4;
  nextVidCanv.height = mainVidCoord.height / 4;

  nextVidCanv.style.position = "absolute";
  nextVidCanv.style.top = "0px";
  nextVidCanv.style.left = (mainVidCoord.width - nextVidCanv.width - 10).toString() + "px";
  nextVidCanv.style.display = "block";
  nextVidCanv.style.backgroundColor = "cornsilk";
  nextVidCanv.style.zindex = 100;
  nextVidCanv.style.borderRadius = "10px";

  nextVidCanv.style.opacity = 0;
}

function renderCanvasImage() {
  /*--------------------------------------------------*/
  previousVidCanvCtx.drawImage(previousVid, 0, 0, previousVidCanv.width, previousVidCanv.height);

  previousVidCanvCtx.fillStyle = "cornsilk";
  previousVidCanvCtx.font = "bold 8pt Cambria";
  previousVidCanvCtx.textAlign = "center";
  previousVidCanvCtx.fillText(imgtitles[prevIdx], (previousVidCanv.width / 2), (previousVidCanv.height - 2), previousVidCanv.width);

  /*--------------------------------------------------*/
  nextVidCanvCtx.drawImage(nextVid, 0, 0, nextVidCanv.width, nextVidCanv.height);

  nextVidCanvCtx.fillStyle = "cornsilk";
  nextVidCanvCtx.font = "bold 8pt Cambria";
  nextVidCanvCtx.textAlign = "center";
  nextVidCanvCtx.fillText(imgtitles[nextIdx], (nextVidCanv.width / 2), (nextVidCanv.height - 2), nextVidCanv.width);
}