// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyC6B15FGvL8Az_G-KALhh0DCcTNI_x6bno",
  authDomain: "chat-dd828.firebaseapp.com",
  projectId: "chat-dd828",
  storageBucket: "chat-dd828.firebasestorage.app",
  messagingSenderId: "922235659091",
  appId: "1:922235659091:web:827cf546f93e630309f7a6",
  measurementId: "G-WC9V3XY2NQ"
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
