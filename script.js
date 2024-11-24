// Mobile Menu Toggle
const mobileMenuIcon = document.querySelector('.mobile-menu-icon');
const navLinks = document.querySelector('.nav-links');

mobileMenuIcon.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuIcon.classList.toggle('active');
});

// Live Communication Script
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const transcriptElement = document.getElementById('transcription-output');

let recognition;
let isTranscribing = false;

if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
                let transcript = event.results[i][0].transcript;
                finalTranscript += transcript;
            }
        }
        if (finalTranscript !== '') {
            displayMessage('You (Spoken)', finalTranscript);
        }
    };

    recognition.onerror = (event) => {
        console.error('Speech recognition error detected: ' + event.error);
    };
} else {
    alert('Your browser does not support speech recognition. Please use a supported browser like Google Chrome.');
    startBtn.disabled = true;
}

startBtn.addEventListener('click', () => {
    recognition.start();
    isTranscribing = true;
    startBtn.disabled = true;
    stopBtn.disabled = false;
});

stopBtn.addEventListener('click', () => {
    recognition.stop();
    isTranscribing = false;
    startBtn.disabled = false;
    stopBtn.disabled = true;
});

// Message Input Functionality
const sendBtn = document.getElementById('send-btn');
const messageInput = document.getElementById('message-input');

sendBtn.addEventListener('click', () => {
    const message = messageInput.value.trim();
    if (message !== '') {
        displayMessage('You (Typed)', message);
        messageInput.value = '';
    }
});

function displayMessage(sender, message) {
    const messageElement = document.createElement('p');
    messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    transcriptElement.appendChild(messageElement);
    transcriptElement.scrollTop = transcriptElement.scrollHeight;
}
