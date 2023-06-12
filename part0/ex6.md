# 0.5: New note in Single page app diagram

```mermaid
sequenceDiagram
    participant browser
    participant server

    Note right of browser: User clicks the submit button

    Note right of browser: The browser creates a new note and appends the local notes array with it

    Note right of browser: The browser rerenders the notes using redrawNotes()

    Note right of browser: The browser runs sendToServer(note)

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: { "message": "note created" }
    deactivate server

    
```