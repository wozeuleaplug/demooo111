function setMuteState(button, videoEl){
  if(!videoEl) return;
  if(videoEl.muted){ button.classList.add('muted'); button.classList.remove('unmuted'); }
  else{ button.classList.add('unmuted'); button.classList.remove('muted'); }
}
const params = new URLSearchParams(location.search);
const guestKey = params.get('guest');
const guestNameEl = document.getElementById('guestName');
const video = document.getElementById('heroVideo');
const source = document.getElementById('heroSource');
const muteToggle = document.getElementById('muteToggle');

function prettyName(key){
  return key.split(' ').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
}
if(guestKey && window.GUESTS && window.GUESTS[guestKey]){
  guestNameEl.textContent = prettyName(guestKey);
  source.src = window.GUESTS[guestKey];
}else{
  guestNameEl.textContent = "Гість";
  source.src = "assets/videos/invite-default.mp4";
}
video.load(); video.play().catch(()=>{});

setMuteState(muteToggle, video);
muteToggle.addEventListener('click', ()=>{ video.muted = !video.muted; setMuteState(muteToggle, video); });
document.addEventListener('click', ()=>{ video.muted = false; setMuteState(muteToggle, video); }, { once:true });
