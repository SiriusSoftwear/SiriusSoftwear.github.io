var lastTime = 0;
var vendors = ['ms', 'moz', 'webkit', 'o'];
for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
  window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
  window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame']
  || window[vendors[x] + 'CancelRequestAnimationFrame'];
}
if (!window.requestAnimationFrame)
window.requestAnimationFrame = function (callback, element) {
  var currTime = new Date().getTime();
  var timeToCall = Math.max(0, 16 - (currTime - lastTime));
  var id = window.setTimeout(function () { callback(currTime + timeToCall); },timeToCall);
  lastTime = currTime + timeToCall;
  return id;
        };
if (!window.cancelAnimationFrame)
window.cancelAnimationFrame = function (id) {
  clearTimeout(id);
        };
function SetupVisualizer(audio){
  context = new AudioContext();
  var analyser = context.createAnalyser();
  analyser.connect(context.destination);
  analyser.fftSize=64;
  var frequencyData= new Uint8Array(analyser.frequencyBinCount);
  var source = context.createMediaElementSource(audio);
  source.connect(analyser);
  analyser.connect(context.destination);
  function update(){
    requestAnimationFrame(update);
    analyser.getByteFrequencyData(frequencyData);
    var bars= document.getElementsByClassName('bar');
    for(var i=0;i<bars.length;i++){
      bars[i].style.height=(frequencyData[i]/255)*400+"px";
    }
  }
  update();
}
var playlist = [new Audio("audio/Lean On.m4a"),new Audio("audio/pursuit.m4a"), new Audio("audio/Never forget you.m4a"),new Audio("audio/Mattafix - Big City Life (LEEX Remix).m4a"),new Audio("audio/The Fray - How To Save A Life (Jiggers Remix).m4a"),new Audio("audio/Alphaville - Forever Young (DIMMI Remix).m4a")];
var title_array= ["Major Lazer & DJ Snake - Lean On", "Kid Cudi - Pursuit Of Happiness ft. MGMT ","Zara Larsson, MNEK - Never Forget You","Mattafix - Big City Life (LEEX Remix)","The Fray - How To Save A Life (Jiggers Remix)","Alphaville - Forever Young (DIMMI Remix)"];
var titleIndex=0;
function startAudio(){
  document.getElementById("audio_title").innerHTML=title_array[titleIndex];
  playlist[titleIndex].addEventListener("timeupdate", function() {
    var currentTime = playlist[titleIndex].currentTime;
    var duration = playlist[titleIndex].duration;
    if(currentTime==duration){
      nextTitle();
    }});
  SetupVisualizer(playlist[titleIndex]);
  playlist[titleIndex].play();
  $('#play').fadeOut(200,function(){
    $('#play').replaceWith('<div id="pause" class="button" onclick="pauseAudio()"></div>');
    $('#pause').fadeIn(200);

  });
  /**$('#play').replaceWith('<div class="audio_button" onclick="pauseAudio()" id="pause"><i class="material-icons" style="font-size:38px;color:#3B3738;">pause</i></div>')**/
}
function pauseAudio(){
  playlist[titleIndex].pause();
  $('#pause').fadeOut(200,function(){
    $('#pause').replaceWith('<div id="play"class="button" onclick="startAudio()"></div>');
    $('#play').fadeIn(500);
  });
}
function nextTitle(){
  playlist[titleIndex].pause();
  playlist[titleIndex].currentTime=0;
  titleIndex=titleIndex+1;
  if(titleIndex==playlist.length){titleIndex=0;}
  startAudio();
}
function prevTitle(){
  playlist[titleIndex].pause();
  playlist[titleIndex].currentTime=0;
  titleIndex=titleIndex-1;
  if(titleIndex<0){titleIndex=playlist.length-1;}
  startAudio();
}

/*var audio= new Audio("audio/Never forget you.m4a");
context = new AudioContext();
var analyser = context.createAnalyser();
analyser.connect(context.destination);
analyser.fftSize=64;
var frequencyData= new Uint8Array(analyser.frequencyBinCount);
var source = context.createMediaElementSource(audio);
source.connect(analyser);
analyser.connect(context.destination);
function update(){
  requestAnimationFrame(update);
  analyser.getByteFrequencyData(frequencyData);
  var bars= document.getElementsByClassName('bar');
  for(var i=0;i<bars.length;i++){
    bars[i].style.width=(frequencyData[i]/255)*400+"px";
  }
}
audio.play();
update();*/
