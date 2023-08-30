const button = document.querySelector('button');
button.addEventListener('click', (e)=>{
    e.preventDefault();
    const input = document.querySelector('input').value;
    if(input==''){
        document.querySelector('.warning').style.display = 'block';
        return;
    }else{
        document.querySelector('.warning').style.display = 'none';
    }
    addToDos(input);
    document.querySelector('input').value =""
    saveToDos();
})

const saveToDos = () =>{
    const contents = document.querySelectorAll("span");
    const data = [];
    contents.forEach(
        (content) => {
            data.push(content.innerText);
        }
    )

    if (data.length === 0) {
        localStorage.removeItem("toDos")
    } else {
        localStorage.setItem("toDos", JSON.stringify(data))
    }

}

// Adding ToDos
function addToDos(text){
    const contentBox = document.createElement('div');
    contentBox.classList.add('content-box');
    contentBox.innerHTML = 
    `
            <input class="checkbox toDo" type="checkbox" name="" id="checkbox" >
            <span  class="textValue toDo">${text}</span>
            <i class="editToDos fa-solid fa-pen-to-square"></i>
            <i class="deleteToDos fa-sharp fa-solid fa-trash"></i>
       
            `


    document.querySelector('.content').appendChild(contentBox);

    // delete ToDo
    contentBox.querySelector('.deleteToDos').addEventListener('click', ()=>{
        contentBox.remove();
        saveToDos();
    })

    // edit your tasks 
    contentBox.querySelector('.editToDos').addEventListener('click', ()=>{
        contentBox.querySelector('.textValue').setAttribute("contenteditable", "true");
        // console.log(contentBox.querySelector('span').focuse());
        saveToDos();
    })

    // mark overthrough task 
    contentBox.querySelector('.checkbox').addEventListener('click', (e)=>{
        if(e.target.value == 'on'){
            contentBox.querySelector('.textValue').style.textDecoration = "line-through";
        }
        else if(e.target.value == ''){
            contentBox.querySelector('.textValue').style.removeProperty = "textDecoration";
        }
        saveToDos();
    })

    // save on focus out of text box

    contentBox.querySelector(".textValue").addEventListener(
        "focusout",
        function () {
            saveToDos();
        }
    )

    // append child

    saveToDos();
}


(
    function () {
        const lsNotes = JSON.parse(localStorage.getItem("toDos"));
        if (lsNotes === null) {
            // addToDos()
        } else {
            lsNotes.forEach(
                (lsNote) => {
                    addToDos(lsNote)
                }
            )
        }

    }
)()
