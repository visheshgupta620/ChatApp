const socket = io();

document.querySelectorAll('.chat-container')[1].style.display = 'none';

const inp = document.querySelector('.input-btn');
const sendBtn = document.querySelector('.snd-btn');
const chat = document.querySelector('.chat');

sendBtn.addEventListener('click', (e)=>{
    const textMsg = inp.value;
    if(textMsg==''){
        return
    }
    else{
    inp.value = '';
    socket.emit('send-msg', {msg:textMsg});
    }
});

socket.on('received-msg', (data)=>{
    console.log(data);
    const div = document.createElement('div');

    if(data.id === socket.id){
        div.classList.add('msg', 'receiver');
    }
    else{
        div.classList.add('msg', 'sender');
    }
    const str = `<strong>${data.username} :</strong> <span>${data.msg}</span>`

    div.innerHTML = str;
    chat.append(div);
});

const usernameInp = document.querySelector('.chat-container input');
const setUsernameBtn = document.querySelector('.chat-container button');

setUsernameBtn.addEventListener('click', (e)=>{
    const username = usernameInp.value;
    
    document.querySelectorAll('.chat-container')[1].style.display = 'block';
    document.querySelectorAll('.chat-container')[0].style.display = 'none';

    socket.emit('username', {username})
})
