# game-chat-CEF :speech_balloon:

A simple game chat UI.
Origonally made to be added as a CEF screen but is multipurpose.

Some things still need to be fleshed out but this is start.

Note: This chat has funcitonality but needs to be wired up to an API to replace the placeholder data.

## :wrench: Features:

### :point_right: Add message
To add a new message just call `addMessage({message}, {chatId})` and will add the message to the correct chat window
### :point_right: Add private message
To add a private message you just need to call `newPrivateMessage({userName})` passing in the username variable
### :point_right: Exit private message tabs
### :point_right: Auto cleans history

## :meat_on_bone: Extras:
- Update the event listeners at the bottom to change keys
- Can change the default tab funciton if you want a different default

# :memo: Making changes:
1. You will need grunt & sass installed to compile the sass
2. Update the files inside `src/` dir and run grunt to compile
3. Use the minified files found `dist/` dir
