const LOCAL_STORAGE_NODE_LIST = "notes";
let notes = JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_NODE_LIST));
notes = notes===null ? [] : notes; 

const SECTION_OF_NOTES = document.getElementById("notes");
const createWindow = document.getElementById("create-window");
const createButton = document.getElementById("create-btn");
const saveButton = document.getElementById("save-btn");
const header = document.getElementById("new-note-header");
const text = document.getElementById("new-note-text");
const close_btn = document.getElementById("close-btn");

createButton.addEventListener("click", () => {
    createWindow.classList.remove("hidden");
    createButton.classList.add("hidden")
});
saveButton.addEventListener("click", () => {
    if(!header.value == "" && !text.value == "") {
    createWindow.classList.add("hidden");
    createButton.classList.remove("hidden");
    saveNote();
    text.value = "";
    header.value = "";
    }
});
close_btn.addEventListener("click", () => {
    createWindow.classList.add("hidden");
    createButton.classList.remove("hidden");
    text.value = "";
    header.value = "";
})


// const CREATE_NOTE = document.getElementById("create-btn"); 

// window.localStorage.setItem(LOCAL_STORAGE_NODE_LIST, JSON.stringify([
//     {    
//         "id": "1"
//         "text": "this is note text",
//         "header": "this is note header"
//     }
// ]));



function createNote(note) {
    let noteElement = document.createElement("div");
    noteElement.classList.add("note");

    noteElement.setAttribute("noteID", note.UUID);
    noteElement.innerHTML = `
        <h3 class="note-header">${note.header}</h3>
        <p class="note-text">${note.text}</p>
        <span class="delete-note" onclick='delete_note("${note.UUID}")'>X</span>
        <img src="./images/redact.png" class="redo-note" onclick='redact_note("${note.UUID}")'>
        <img src="./images/save.png" class="save-redo-note hidden"'>
    `;
    noteElement.addEventListener("click", (e) => {

    })

    return noteElement;
}



function delete_note(note_UUID) {
    let index = -1;
    for(let i in notes) {
        if(notes[i].UUID == note_UUID) {
            if(notes.lenght==0) {
                index = i;
                break;
            }
        }
        notes.splice(index, 1);
        window.localStorage.setItem(LOCAL_STORAGE_NODE_LIST, JSON.stringify(notes));
        SECTION_OF_NOTES.innerHTML = "";
        fillpage();
    }
}

function redact_note(note_UUID) {
 for(let i in notes) {
    if(notes[i].UUID = note_UUID) {
        index=i;
        break;
        }
    }
    let noteDiv = document.querySelector(`div[noteid='${note_UUID}']`);
    let header_= noteDiv.querySelector(".note-header");
    let text_ = noteDiv.querySelector(".note-text");
    let save_redact_ = noteDiv.querySelector(".save-redo-note");
    let redact_note_ = noteDiv.querySelector(".redo-note");
    save_redact_.classList.remove("hidden");
    redact_note_.classList.add("hidden");


    // saveButton_.onclick = null;
    save_redact_.addEventListener("click", (e) => {
        notes[index].header = header_.innerText;
        notes[index].text = text_.innerText;
        window.localStorage.setItem(LOCAL_STORAGE_NODE_LIST, JSON.stringify(notes));
        editButton.classList.remove("hidden");
        saveButton.classList.add("hidden");
        header_.removeAttribute('contenteditable');
        text_.removeAttribute('contenteditable');
    });

    let editButton = noteDiv.querySelector(".redo-note");
    let saveButton = noteDiv.querySelector(".save-redo-note");

    header_.setAttribute("contenteditable", "");
    text_.setAttribute("contenteditable", "");
    header_.focus();
    
    return;
}

function fillpage() {
    if(notes == "null")
    notes = []
    for(let note of notes) {
        SECTION_OF_NOTES.appendChild(createNote(note));
    }
}

function saveNote() {
    const note = {
        "header": header.value,
        "text": text.value,
        "UUID": self.crypto.randomUUID()
    }
    notes.push(note);
    SECTION_OF_NOTES.appendChild(createNote(note))
    window.localStorage.setItem(LOCAL_STORAGE_NODE_LIST, JSON.stringify(notes));
}


fillpage();
