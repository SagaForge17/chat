// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyC6B15FGvL8Az_G-KALhh0DCcTNI_x6bno",
  authDomain: "chat-dd828.firebaseapp.com",
  databaseURL: "https://chat-dd828-default-rtdb.firebaseio.com",
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
const userList = document.getElementById("user-list");

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
    messageElement.classList.add('chat-message');
    
    const timestamp = new Date(messageData.timestamp).toLocaleTimeString();
    messageElement.innerHTML = `
        <span class="username">${messageData.username}:</span>
        <span class="message">${messageData.message}</span>
        <span class="timestamp">${timestamp}</span>
    `;

    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Listen for user list updates
database.ref('users').on('child_added', (snapshot) => {
    const username = snapshot.val();
    const userItem = document.createElement('li');
    userItem.textContent = username;
    userList.appendChild(userItem);
});

// Listen for user removal
database.ref('users').on('child_removed', (snapshot) => {
    const username = snapshot.val();
    const userItems = userList.getElementsByTagName('li');
    
    for (let i = 0; i < userItems.length; i++) {
        if (userItems[i].textContent === username) {
            userList.removeChild(userItems[i]);
            break;
        }
    }
});

// Add user to the user list
database.ref('users').push('Anonymous');

// Remove user on unload
window.addEventListener('beforeunload', () => {
    const username = usernameInput.value.trim();
    database.ref('users').orderByValue().equalTo(username).once('child_added', (snapshot) => {
        snapshot.ref.remove();
    });
});
