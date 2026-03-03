const eye = document.querySelector('.eye');

eye.addEventListener('mouseenter', () => {
    eye.style.backgroundImage = "url('texture/eye_open.png')";
});

eye.addEventListener('mouseleave', () => {
    eye.style.backgroundImage = "url('texture/eye_close.png')";
});