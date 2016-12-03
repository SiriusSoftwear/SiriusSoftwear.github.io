var playlist = [new Audio("audio/Lean On.m4a"),new Audio("audio/pursuit.m4a"), new Audio("audio/Never forget you.m4a"),new Audio("audio/Mattafix - Big City Life (LEEX Remix).m4a"),new Audio("audio/The Fray - How To Save A Life (Jiggers Remix).m4a"),new Audio("audio/Alphaville - Forever Young (DIMMI Remix).m4a")];
var title_array= ["Major Lazer & DJ Snake - Lean On", "Kid Cudi - Pursuit Of Happiness ft. MGMT ","Zara Larsson, MNEK - Never Forget You","Mattafix - Big City Life (LEEX Remix)","The Fray - How To Save A Life (Jiggers Remix)","Alphaville - Forever Young (DIMMI Remix)"];
var titleIndex=0;
function startAudio(){
  document.getElementById("audio_title").innerHTML=title_array[titleIndex];
  playlist[titleIndex].addEventListener("timeupdate", function() {
    var currentTime = playlist[titleIndex].currentTime;
    var duration = playlist[titleIndex].duration;
    $('.hp_range').stop(true,true).animate({'width':(currentTime +.25)/duration*100+'%'},250,'linear');
    if(currentTime==duration){
      nextTitle();
    }
});
  playlist[titleIndex].play();
  $('#play').fadeOut(500,function(){
    $('#play').replaceWith('<div class="audio_button" onclick="pauseAudio()" id="pause"><i class="material-icons" style="font-size:38px;color:#3B3738;">pause</i></div>');
    $('#pause').fadeIn(500);

  });
  /**$('#play').replaceWith('<div class="audio_button" onclick="pauseAudio()" id="pause"><i class="material-icons" style="font-size:38px;color:#3B3738;">pause</i></div>')**/
}
function pauseAudio(){
  playlist[titleIndex].pause();
  $('#pause').fadeOut(500,function(){
    $('#pause').replaceWith('<div class="audio_button" onclick="startAudio()" id="play"><i class="material-icons" style="font-size:38px;color:#3B3738;">play_arrow</i></div>');
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
