import '../styles.css';
import animate from "./one";

const cursor = document.getElementById('cursor');
const boxArea = document.getElementById('box');

window.addEventListener('mousemove', e => {
    cursor.style.top = e.clientY - cursor.clientHeight / 2 + 'px';
    cursor.style.left = e.clientX - cursor.clientWidth / 2 + 'px';
});

boxArea.addEventListener('mouseenter', e => {
    console.log('mouse enter');
    cursor.style.width = '2rem';
    cursor.style.height = '2rem';
});

boxArea.addEventListener('mouseleave', e => {
    cursor.style.width = '0.75rem';
    cursor.style.height = '0.75rem';
})

animate();