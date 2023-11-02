"use strict";

let connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

connection.on("ReceiveMessage", function ( message) {
    let message_list = document.getElementById("messages-list");
    let new_box = document.createElement("div");
    new_box.textContent = message;
    new_box.classList.add("bg-warning")
    message_list.appendChild(
        new_box
    );
});

connection.start().then(function () {
}).catch(function (err) {
    return console.error(err.toString());
});

document.getElementById("send-button").addEventListener("click", SendMessage);
document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        SendMessage(event);
    }
})

function SendMessage(event) {
    let messageBox = document.getElementById("message-input");
    let message = messageBox.value;
    connection.invoke("SendMessage", message).catch(function (err) {
        return console.error(err.toString());
    });

    let message_list = document.getElementById("messages-list");
    let new_box = document.createElement("div");
    new_box.textContent = message;
    new_box.classList.add("bg-info")
    message_list.appendChild(
        new_box
    );

    messageBox.value = "";
    event.preventDefault();
}