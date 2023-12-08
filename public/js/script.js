import axios from 'https://cdn.jsdelivr.net/npm/axios@1.5.1/+esm'

const form = document.getElementById('registration');

const username = document.getElementById('username');
const email = document.getElementById('email');
const discription = document.getElementById('discription');


function postData(userData){
    axios.post('/',userData)
        .then((response)=>{
            addUser(response.data.appointment)
        }).catch((error)=>{
            console.log(error);
        })
}

function getId(key){
    return new Promise ((resolve)=>{
        axios.get('/appointments')
        .then((response)=>{
            const Id = response.data.appointment.find((item)=>item.email == key);   
            resolve(Id.id)         
        })
    }) 
    
}

function deleteData(key){
    getId(key)
        .then((id)=>{
            axios.get('/deleteAppointment'+`/${id}`)
                .then((response)=>{
                    console.log("del",response)
                })
        })    
}

function updateData(key){

    const username = document.getElementById('username');
    const email = document.getElementById('email');
    const discription = document.getElementById('discription');


    getId(key)
        .then((id)=>{
            console.log(id);
            const data ={
                username: username.value,
                email: email.value,
                discription: discription.value
            }
            axios.get('/editAppointment'+`/${id}`)
                .then(()=>{
                    axios.get('/deleteAppointment'+`/${id}`)
                })
        })
}


form.addEventListener("submit",(event)=>{
    event.preventDefault()

    const userData ={
        username: username.value,
        email: email.value,
        discription: discription.value
    }

    postData(userData);
    form.reset();
})

function addUser(userData){
    const ulList = document.getElementById('newusers');

    const li = document.createElement('li');
    li.className="userList";
    li.setAttribute('data-user-data', JSON.stringify(userData));

    var btn = document.createElement("button");
    btn.className = "btn delete";

    var editBtn = document.createElement("button");
    editBtn.className = "btn edit";

    var text = document.createTextNode("Username: "+userData.username+" Email: "+userData.email);
    li.appendChild(text);


    btn.appendChild(document.createTextNode("Delete"));
    editBtn.appendChild(document.createTextNode("Edit"));

    li.appendChild(btn);
    li.appendChild(editBtn);

    ulList.appendChild(li);
}

const ulList = document.getElementById('newusers');
ulList.addEventListener('click',(e)=>{
    if(e.target.classList.contains('delete')){
        const li = e.target.parentElement;
        const userData = JSON.parse(li.getAttribute('data-user-data'))
        
        deleteData(userData.email);
        li.remove();
    }
    if(e.target.classList.contains('edit')){
        const li = e.target.parentElement;
        const userData = JSON.parse(li.getAttribute('data-user-data'))

        const uname = document.getElementById('username')
        const email = document.getElementById('email');
        const discription = document.getElementById('discription');

        uname.value = userData.username;
        email.value = userData.email;
        discription.value = userData.description;

        updateData(userData.email)
        li.remove();
    }
})

function displayUsers(){
    axios.get('/appointments')
        .then((response)=>{
            const length = Object.keys(response.data.appointment).length;
            for(let i=0;i<length;i++){
                const data = response.data.appointment[i];
                addUser(data);
            }
    })
}

window.addEventListener('load',()=>{
    displayUsers();
})