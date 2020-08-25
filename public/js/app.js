console.log("Client side JS file");

const form = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

messageOne.textContent = "";

form.addEventListener("submit", (e) => {
  e.preventDefault();
  messageOne.textContent = "Loading...";
  messageTwo.textContent =''

  fetch(`/weather?address=${search.value}`).then(
    (response) => {
      response.json().then((data) => {
        if(data.error){
            messageOne.textContent = data.error
        }
        else{
            console.log(data);
            messageOne.textContent = `Location : ${data.place_name}`
            messageTwo.textContent = `Weather : ${data.description}`
        }
        
      });
    }
  );
});
