/* Guest list & personalized video mapping */
const GUESTS = [
  "хічїлмаз софія",
  "головійчук єлизавета",
  "головійчук ліза",
  "кузнєцова олександра",
  "кузнєцова саша",
  "ярмак олена",
  "гуц юлія",
  "гуц юля",
  "кухарчук анна",
  "кухарчук аня",
  "романовська тетяна",
  "романовська таня",
  "сапелюк ірина",
  "сапелюк іра",
  "двораковська анна",
  "двораковська аня",
  "онищук софія"
];
/* Map multiple spellings to the same video if needed */
const VIDEO_BY_GUEST = new Map([
  ["хічїлмаз софія","assets/videos/guest-01.mp4"],
  ["головійчук єлизавета","assets/videos/guest-02.mp4"],
  ["головійчук ліза","assets/videos/guest-02.mp4"],
  ["кузнєцова олександра","assets/videos/guest-03.mp4"],
  ["кузнєцова саша","assets/videos/guest-03.mp4"],
  ["ярмак олена","assets/videos/guest-04.mp4"],
  ["гуц юлія","assets/videos/guest-05.mp4"],
  ["гуц юля","assets/videos/guest-05.mp4"],
  ["кухарчук анна","assets/videos/guest-06.mp4"],
  ["кухарчук аня","assets/videos/guest-06.mp4"],
  ["романовська тетяна","assets/videos/guest-07.mp4"],
  ["романовська таня","assets/videos/guest-07.mp4"],
  ["сапелюк ірина","assets/videos/guest-08.mp4"],
  ["сапелюк іра","assets/videos/guest-08.mp4"],
  ["двораковська анна","assets/videos/guest-09.mp4"],
  ["двораковська аня","assets/videos/guest-09.mp4"],
  ["онищук софія","assets/videos/guest-10.mp4"]
]);
const DEFAULT_INVITE_VIDEO = "assets/videos/invite-default.mp4";

/* Helpers */
function normalizeName(s){
  return (s || "").toLowerCase().trim().replace(/\s+/g," ");
}
function qs(sel, root=document){ return root.querySelector(sel); }
function qsa(sel, root=document){ return [...root.querySelectorAll(sel)]; }

/* Sound toggle: toggles all <video> on page */
function setupSoundToggle(){
  const btn = qs('#sound-toggle');
  const vids = qsa('video');
  if(!btn || vids.length===0) return;
  const setState = (muted)=>{
    vids.forEach(v=> v.muted = muted);
    btn.classList.toggle('muted', muted);
  };
  /* Start muted (for autoplay), user can unmute */
  setState(true);
  btn.addEventListener('click', ()=>{
    const nowMuted = !vids[0].muted;
    setState(nowMuted);
  });
}

/* Page routing logic */
document.addEventListener('DOMContentLoaded', ()=>{
  setupSoundToggle();

  const loginForm = qs('#login-form');
  if(loginForm){
    const input = qs('#full-name', loginForm);
    const error = qs('#login-error', loginForm);

    loginForm.addEventListener('submit', (e)=>{
      e.preventDefault();
      const name = normalizeName(input.value);
      if(GUESTS.includes(name)){
        /* Store and redirect */
        localStorage.setItem('guest_name', name);
        const v = VIDEO_BY_GUEST.get(name) || DEFAULT_INVITE_VIDEO;
        localStorage.setItem('guest_video', v);
        window.location.href = 'invite.html';
      }else{
        /* Show error, allow unlimited retries */
        error.textContent = "Неправильно. Спробуйте ще раз.";
        input.select();
      }
    });
  }

  /* Invite page setup */
  const inviteVideo = qs('#invite-video');
  const inviteSource = qs('#invite-source');
  if(inviteVideo && inviteSource){
    const name = localStorage.getItem('guest_name');
    const videoPath = localStorage.getItem('guest_video') || DEFAULT_INVITE_VIDEO;
    if(!name){
      /* No access -> back to login */
      window.location.replace('index.html');
      return;
    }
    inviteSource.src = videoPath;
    inviteVideo.load();
  }
});
