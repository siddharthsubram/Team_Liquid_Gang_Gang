//mobile menu

const burgerIcon = document.getElementById('burger');
const navbarMenu = document.getElementById('nav-links');
const tlLogo = document.getElementById('tl-logo');

burgerIcon.addEventListener('click', function(){navbarMenu.classList.toggle('is-active')});

const modalBG = document.querySelector('.modal-background');


const havenModal = document.getElementById('havenRate');
const havenclose = document.getElementById('havenClose');
const havenIcon = document.getElementById('havenstats');
havenIcon.addEventListener('click', function(){
    havenModal.classList.add('is-active');
})
havenclose.addEventListener('click', function(){
    havenModal.classList.remove('is-active');
})

const bindModal = document.getElementById('bindRate');
const bindclose = document.getElementById('bindClose');
const bindIcon = document.getElementById('bindstats');
bindIcon.addEventListener('click', function(){
    bindModal.classList.add('is-active');
})
bindclose.addEventListener('click', function(){
    bindModal.classList.remove('is-active');
})

const splitModal = document.getElementById('splitRate');
const splitclose = document.getElementById('splitClose');
const splitIcon = document.getElementById('splitstats');
splitIcon.addEventListener('click', function(){
    splitModal.classList.add('is-active');
})
splitclose.addEventListener('click', function(){
    splitModal.classList.remove('is-active');
})

const ascentModal = document.getElementById('ascentRate');
const ascentclose = document.getElementById('ascentClose');
const ascentIcon = document.getElementById('ascentstats');
ascentIcon.addEventListener('click', function(){
    ascentModal.classList.add('is-active');
})
ascentclose.addEventListener('click', function(){
    ascentModal.classList.remove('is-active');
})
