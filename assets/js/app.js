function normalizeName(v){
  return v.toLowerCase().replace(/\s+/g,' ').trim();
}
const input = document.getElementById('fullName');
const btn = document.getElementById('loginBtn');
const err = document.getElementById('error');
const landingVideo = document.getElementById('landingVideo');
const muteToggle = document.getElementById('muteToggle');

function setMuteState(button, video){
  if(!video) return;
  if(video.muted){ button.classList.add('muted'); button.classList.remove('unmuted'); }
  else{ button.classList.add('unmuted'); button.classList.remove('muted'); }
}
setMuteState(muteToggle, landingVideo);
muteToggle.addEventListener('click', ()=>{ landingVideo.muted = !landingVideo.muted; setMuteState(muteToggle, landingVideo); });
document.addEventListener('click', ()=>{ if(landingVideo){ landingVideo.muted = false; setMuteState(muteToggle, landingVideo);} }, { once:true });

function goInvite(guestKey){
  const url = new URL(window.location.href);
  url.pathname = url.pathname.replace(/index\.html?$/,'') + 'invitation.html';
  url.search = '?guest=' + encodeURIComponent(guestKey);
  document.body.style.opacity = 0; document.body.style.transition = 'opacity .5s ease';
  setTimeout(()=>{ window.location.href = url.toString(); }, 300);
}

btn.addEventListener('click', ()=>{
  const val = normalizeName(input.value);
  if(!val){ err.textContent = "Введіть прізвище та імʼя"; return; }
  if(window.GUESTS && window.GUESTS[val]){ err.textContent = ""; goInvite(val); }
  else{ err.textContent = "На жаль, вас не знайдено у списку. Спробуйте ще раз."; }
});
input.addEventListener('keydown', (e)=>{ if(e.key === 'Enter'){ btn.click(); } });
