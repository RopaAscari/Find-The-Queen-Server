
const writeEvent = (text) => {
  const parent = document.querySelector('#events');
  const el = document.createElement('li');
  el.innerHTML = text;
  parent.appendChild(el);
};

const Refresh = (e) => {
  location.reload();
};

const addButtonListeners = () => {
  ['1', '2', '3'].forEach((id) => {
    const button = document.getElementById(id);
    button.addEventListener('click', () => {
      sock.emit('turn', id);
    });
  });
};

writeEvent('Welcome to Find The Queen : The game has started');
const sock = io();
sock.on('message', writeEvent);

addButtonListeners();
