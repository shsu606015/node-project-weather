console.log("Client side javaScript file is loaded!")

// look for a specific event
// if only names, we check the "first" element we find
const weatherform = document.querySelector('form'); 
const search = document.querySelector('input');
// assign unique id to look for specific event
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');



// e = event
weatherform.addEventListener('submit', (e) => { 
    e.preventDefault() // this will prevent the event cause auto refrash

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.err) {
                messageOne.textContent = data.err;
            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forcast;
            }
        });
    })
})