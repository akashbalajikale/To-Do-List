 let cl = console.log;

 const listForm = document.getElementById('listForm');
 const fnameControl = document.getElementById('fname');
 const submitBtn = document.getElementById('submitBtn');
 const cancelBtn = document.getElementById('cancelBtn');
 const updateBtn = document.getElementById('updateBtn');
 const movieContainer = document.getElementById('movieContainer');

 const generateUuid = () => {
    return (
        String('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx')
    ).replace(/[xy]/g, (character) => {
        const random = (Math.random() * 16) | 0;
        const value = character === "x" ? random : (random & 0x3) | 0x8;
 
        return value.toString(16);
    });
 };

let listArray =[];

listArray = JSON.parse(localStorage.getItem('listArray')) ?? [];

let templating = arr =>{
    let result ='';
    arr.forEach(ele =>{
        result += `
        <div class="card" id="${ele.id}">
            <div class="card-header">
                    ${ele.fname}
             </div>
        
            <div class="card-footer">
                <div class="row">
                     <div class="col-md-12">
                        <button class="btn btn-success" onclick="onEditbtn(this)">Edit</button>
                        <button class="btn btn-danger float-right" onclick="onDeletebtn(this)">Delete</button>
                    </div>
                 </div>
            </div>
     </div>
        `
    })
    movieContainer.innerHTML =result;
}
templating(listArray)

const OnlistHandler =(eve) => {
        eve.preventDefault();
        let obj ={
            fname : fnameControl.value,
            id :generateUuid()
        }
        listArray.push(obj);
        listForm.reset()
        localStorage.setItem('listArray', JSON.stringify(listArray));
        cl(obj)
        templating(listArray)
        Swal.fire(' Your New Task added')
};

const onEditbtn =(eve) => {
    let EditId = eve.closest('.card').getAttribute("id");
    localStorage.setItem('EditId', EditId )
    let Editobj = listArray.find(x => x.id === EditId)
     fname.value = Editobj.fname
     updateBtn.classList.remove('d-none')
     submitBtn.classList.add('d-none')
};

const OnUpdateBtn =(ele)=>{
     let updateId = localStorage.getItem('EditId')
     let updateObj = listArray.find(x => x.id === updateId)
     updateObj.fname =fname.value
     localStorage.setItem('listArray', JSON.stringify(listArray));
     templating(listArray)
     updateBtn.classList.add('d-none');
     submitBtn.classList.remove('d-none')
     listForm.reset()
     Swal.fire('Your daily task has been updated')
}

const onDeletebtn = (ele) => {
   let deleteId =ele.closest('.card').id;
    deleteIndex =listArray.findIndex(ele => ele.id === deleteId);
    listArray.splice(deleteIndex, 1);
    localStorage.setItem('listArray', JSON.stringify(listArray));
    templating(listArray)
    listForm.reset()
    Swal.fire('Task deleted')
    
};
 
 listForm.addEventListener('submit',  OnlistHandler)
 updateBtn.addEventListener('click', OnUpdateBtn)
