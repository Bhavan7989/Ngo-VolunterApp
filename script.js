// humanized interactivity: typing effect, reveal on scroll, cursor, form handling
document.addEventListener('DOMContentLoaded', () => {
  // 1) small typing animation inside hero headline (replace second phrase)
  const humanized = document.querySelector('.humanized');
  const phrases = ['One act of care', 'A small step together', 'Real help, real people'];
  let pi = 0, ci = 0, adding = true;
  function tick() {
    const phrase = phrases[pi];
    if(adding){
      humanized.textContent = phrase.slice(0, ci++);
      if(ci > phrase.length){ adding = false; setTimeout(tick, 1100); return; }
    } else {
      humanized.textContent = phrase.slice(0, ci--);
      if(ci < 0){ adding = true; pi = (pi+1)%phrases.length; setTimeout(tick, 200); return; }
    }
    setTimeout(tick, adding ? 80 : 40);
  }
  tick();

  // 2) reveal on scroll using IntersectionObserver
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if(e.isIntersecting) e.target.classList.add('show');
    });
  }, {threshold: 0.12});
  reveals.forEach(r => observer.observe(r));

  // 3) fancy cursor
  const cursor = document.getElementById('cursor');
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });
  // enlarge cursor on hover for interactive elements
  document.querySelectorAll('a, button, .btn').forEach(el => {
    el.addEventListener('mouseenter', () => { cursor.style.transform = 'translate(-50%,-50%) scale(2)'; });
    el.addEventListener('mouseleave', () => { cursor.style.transform = 'translate(-50%,-50%) scale(1)'; });
  });

  // 4) simple nav hamburger for mobile (toggle nav)
  const hamburger = document.getElementById('hamburger');
  hamburger && hamburger.addEventListener('click', () => {
    document.querySelector('.nav').classList.toggle('open');
    if(document.querySelector('.nav').classList.contains('open')){
      document.querySelector('.nav').style.display = 'flex';
      document.querySelector('.nav').style.flexDirection = 'column';
      document.querySelector('.nav').style.background = 'rgba(2,6,23,0.65)';
      document.querySelector('.nav').style.position = 'absolute';
      document.querySelector('.nav').style.right = '12px';
      document.querySelector('.nav').style.top = '56px';
      document.querySelector('.nav').style.padding = '12px';
      document.querySelector('.nav').style.borderRadius = '10px';
    } else {
      document.querySelector('.nav').style.display = '';
    }
  });

  // 5) contact form behavior (no backend) — emulate sending
  const form = document.getElementById('contactForm');
  const formMsg = document.getElementById('formMsg');
  form && form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const data = new FormData(form);
    const name = data.get('name'), email = data.get('email'), opp = data.get('opportunity');
    if(!name || !email || !opp){
      formMsg.textContent = 'Please fill required fields.';
      return;
    }
    // fake send
    formMsg.textContent = 'Sending…';
    setTimeout(() => {
      formMsg.textContent = `Thanks ${name}! We received your interest. Check ${email} for a confirmation.`;
      form.reset();
    }, 900);
  });

  // 6) small story modal from "Our Story" button (humanized micro interaction)
  const storyBtn = document.getElementById('btn-story');
  if(storyBtn){
    storyBtn.addEventListener('click', () => {
      const overlay = document.createElement('div');
      overlay.style.position='fixed'; overlay.style.inset='0'; overlay.style.display='flex'; overlay.style.alignItems='center';
      overlay.style.justifyContent='center'; overlay.style.background='rgba(2,6,23,0.75)'; overlay.style.zIndex = 9999;
      const box = document.createElement('div');
      box.style.width='min(720px,92vw)'; box.style.background='#041023'; box.style.padding='22px'; box.style.borderRadius='14px';
      box.innerHTML = `<h3 style="margin:0 0 10px">Our Story</h3><p style="color:#bcd7c6;line-height:1.5">Started by a small group of neighbours, Volunteer Connect grew into a community that values warmth and practical help. We match volunteers to small, meaningful tasks — because every small action matters.</p><div style="text-align:right;margin-top:12px"><button id="closeStory" class="btn small">Close</button></div>`;
      overlay.appendChild(box);
      document.body.appendChild(overlay);
      document.getElementById('closeStory').addEventListener('click', () => overlay.remove());
    });
  }

  // 7) small accessibility: set current year
  document.getElementById('year').textContent = new Date().getFullYear();
});
