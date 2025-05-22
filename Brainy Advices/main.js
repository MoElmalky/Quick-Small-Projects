const nab = document.getElementById("nab");
const advice = document.getElementById("advice");

nab.addEventListener("click",()=>{
    fetch('https://api.adviceslip.com/advice')
  .then(response => response.json())
  .then(data => {
    advice.textContent = data.slip.advice;
    console.log(data.slip.advice);
  })
  .catch(error => {
    console.error('Error:', error);
  });

});

