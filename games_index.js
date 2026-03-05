function openModal() {
  document.getElementById("overlay").style.display = "block";
  document.getElementById("modal").style.display = "block";
}
function closeModal() {
  document.getElementById("overlay").style.display = "none";
  document.getElementById("modal").style.display = "none";
}
const eyeImg = document.getElementById('eye-sprite');
const darkenLayer = document.getElementById('screen-darken');
const body = document.body;

document.addEventListener('DOMContentLoaded', function() {
    const eye = document.getElementById('eye-sprite');
    const darken = document.getElementById('screen-darken');
    const modal = document.getElementById('modal');

    if (eye && modal) {
        eye.addEventListener('mouseenter', () => {
            eye.src = 'texture/eye_open.png';
            darken.style.opacity = '0.8';
            setTimeout(() => {
                if (darken.style.opacity === '0.8') {
                    modal.classList.add('shake-active');
                }
            }, 1200);
        });
        eye.addEventListener('mouseleave', () => {
            eye.src = 'texture/eye_close.png';
            darken.style.opacity = '0';
            modal.classList.remove('shake-active');
        });
    }
});
