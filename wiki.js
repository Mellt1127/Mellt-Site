function openModal() {
  document.getElementById("overlay").style.display = "block";
  document.getElementById("modal").style.display = "block";
}

function closeModal() {
  document.getElementById("overlay").style.display = "none";
  document.getElementById("modal").style.display = "none";
}

document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('.wiki-nav');
    const sections = document.querySelectorAll('.wiki-content section');

    links.forEach(link => {
        link.onclick = function(e) {
            e.preventDefault();
            
            links.forEach(l => l.classList.remove('active-link'));

            sections.forEach(s => s.style.display = 'none');
            
            this.classList.add('active-link');
          
            const targetId = this.getAttribute('href').substring(1);
            document.getElementById(targetId).style.display = 'block';
        };
    });
});

let pattern = ['m', 'e', 'l', 'l', 't'];
let current = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === pattern[current]) {
        current++;
        if (current === pattern.length) {
            alert("СЕКРЕТ ОТКРЫТ! Ты нашел пасхалку!");
            document.body.style.filter = "invert(1)";
            current = 0;
        }
    } else {
        current = 0;
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const eye = document.getElementById('eye-sprite');
    const darken = document.getElementById('screen-darken');
    const content = document.querySelector('.wiki-layout');

    if (eye && darken) {
        eye.addEventListener('mouseenter', () => {
            eye.src = 'texture/eye_open.png';
            darken.style.opacity = '0.95';
            
            setTimeout(() => {
                if (darken.style.opacity == '0.95') {
                    content.classList.add('shake-active');
                }
            }, 1000);
        });

        eye.addEventListener('mouseleave', () => {
            eye.src = 'texture/eye_close.png';
            darken.style.opacity = '0';
            content.classList.remove('shake-active');
        });
    }
});

javascript
document.querySelectorAll('.wiki-nav').forEach(link => {
    link.onclick = function(e) {
        e.preventDefault(); 

        document.querySelectorAll('.wiki-nav').forEach(nav => nav.classList.remove('active-link'));

        this.classList.add('active-link');

        document.querySelectorAll('.wiki-content section').forEach(section => {
            section.style.display = 'none';
        });

        const targetId = this.getAttribute('href').replace('#', '');
        document.getElementById(targetId).style.display = 'block';
    }
});