const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const messageOne = document.querySelector('#messageOne')
const messageTwo = document.querySelector('#messageTwo')
const messageThree = document.querySelector('#messageThree')
const messageFour = document.querySelector('#messageFour')


weatherForm.addEventListener('submit',(event)=>{
    event.preventDefault()
    console.log(search.value)
    
    messageOne.textContent = "loading...."

    fetch('/weather?address='+search.value).then((response) => {
    response.json().then((data)=>{
           if(data.e){
                messageOne.textContent = "No results found, Make sure that all words are spelled correctly."
                messageTwo.textContent = ""
               console.log(data.error)
           }
           else{
               messageOne.textContent = "place searched="+data.place_searched
               messageTwo.textContent = "Current temperature is "+data.forecastData.temp+"°C, but feels like "+data.forecastData.feels_like+"°C"
               messageThree.textContent = "humidity is "+data.forecastData.humidity+"%"

            console.log("place searched=",data.place_searched)
            console.log("forecast data=",data.forecastData.temp)
           }
    })
})
})