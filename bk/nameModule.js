
function greet(firstName, lastName) {
    return `Hello, ${firstName} ${lastName}!`;
}

function messageInfo(senderName, message, subject) {
    return `${subject}, you got a new message from ${senderName}: ${message}`;
}


module.exports = {
    greet,
    messageInfo
};
