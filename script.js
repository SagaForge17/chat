// Firebase Configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
    measurementId: "YOUR_MEASUREMENT_ID"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Elements
const usernameInput = document.getElementById("username");
const messageInput = document.getElementById("message");
const sendButton = document.getElementById("send-btn");
const chatMessages = document.getElementById("chat-messages");

// Send message
sendButton.addEventListener("click", () => {
    const username = usernameInput.value.trim();
    const message = messageInput.value.trim();
    
    if (username && message) {
        const messageData = {
            username: username,
            message: message,
            timestamp: Date.now()
        };

        // Push message to Firebase
        database.ref('messages').push(messageData);

        // Clear the input
        messageInput.value = '';
    }
});

// Listen for new messages
database.ref('messages').on('child_added', (snapshot) => {
    const messageData = snapshot.val();
    const messageElement = document.createElement('div');
    messageElement.textContent = `${messageData.username}: ${messageData.message}`;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
});
