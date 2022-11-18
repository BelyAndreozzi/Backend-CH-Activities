console.log('Funciono uwu');

const socketClient = io()

const productForm = document.getElementById('productForm')
productForm.addEventListener('submit', (event)=>{
    event.preventDefault()
    const product = {
        title: document.getElementById('title').value,
        price: document.getElementById('price').value,
        thumbnail: document.getElementById('thumbnail').value
    }
    
    socketClient.emit('newProduct', product)
})

const productsContainer = document.getElementById('productsContainer')
const chatContainer = document.getElementById('chatContainer')
socketClient.on('allProducts', async(data)=>{
    //productos
    const templateTable = await fetch('./templates/table.handlebars')
    const templateFormat = await templateTable.text()
    
    const template = Handlebars.compile(templateFormat)

    const html = template({products:data})

    productsContainer.innerHTML = html

    //mensajería 
    let messages=''
    data.forEach(element => {
        messages += `<p>Autor: ${element.author} - message: ${element.text}</p>`
    });
    chatContainer.innerHTML = messages
})

let email = ''
Swal.fire({
    title:'Bienvenido',
    text: 'Ingresa tu email',
    input: 'text',
    allowOutsideClick: false
}).then(response=>{
    console.log(response);
    email = response.value
    document.getElementById('email').innerHTML = `¡Bienvenido ${email}!`
})

const chatForm = document.getElementById('chatForm')

chatForm.addEventListener("submit",(event)=>{
    //prevenir que se recarge la pagina cuando se envia el formulario
    event.preventDefault();
    console.log("formulario enviado")
    const hora = getDate()
    const mensajes = {
        email:document.getElementById('email').value,
        date:hora,
        msg:document.getElementById("messageChat").value
    }
    //envia nuevo mensaje
    socketClient.emit("newMsgs", mensajes)
    document.getElementById('messageChat').value = ''
})

const getDate = () => {
    const date = new Date();
    const month = date.getMonth()+1;
    const dateFormated = date.getDate() + "/" + month + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    return dateFormated;
}

socketClient.on("allMessages",async(data)=>{
    const templateMessage = await fetch("./templates/chat.handlebars");
    const templateFormat = await templateMessage.text();

    const template = Handlebars.compile(templateFormat);

    const html = template({mensajes: data});

    
    chatContainer.innerHTML = html;
});