const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const restart = document.querySelector('.restart')
const board = document.querySelector('#board')
const colors = ['#98FB98', '#FFB6C1', '#FFFACD', '#7FFFD4', '#DDA0DD', '#87CEFA']
let time = 0
let score = 0



startBtn.addEventListener('click', (event) => {
event.preventDefault()
screens[0].classList.add('up')
})

timeList.addEventListener('click', event => {
    if (event.target.classList.contains('time-btn')) {
    time = parseInt(event.target.getAttribute('data-time'))
    screens[1].classList.add('up')
    startGame()
    }
})

board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')) {
    score++
    event.target.remove()
    createRandomCircle()
    }
})

document.addEventListener('keydown', event => {
    if (event.key === 'ArrowDown'){
        winTheGame()
    }
})





function startGame() {
    createRandomCircle()
    setInterval(decreaseTime, 1000)
    setTime(time)
}

function decreaseTime() {
    if (time === 0) {
    finishGame()
    } else {
        let current = --time
        if (current < 10){
            current = `0${current}`
        }
        setTime(current)
    }

}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`
}

function finishGame() {
    timeEl.parentNode.classList.add('hide')
    board.innerHTML = `<h1>Score: <span class = "primary">${score}</span></h1>
    <button class="restart" onClick="refreshPage()">
    <i class="fas fa-redo-alt"></i>
    Restart</button>
    <span id="hack" title="Press 'keydown' when you start the game to hack"><i class="far fa-bookmark"></i></span>`
}

function refreshPage() {
    window.location.reload();
} 


function createRandomCircle() {
    const circle = document.createElement('div')
    const size = getRandomNumber(10, 60)
    const {width, height} = board.getBoundingClientRect()
    const x = getRandomNumber(0, width - size)
    const y = getRandomNumber(0, height - size)

    circle.classList.add('circle')
    circle.style.width = `${size}px`
    circle.style.height =`${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`
    circle.style.background = getRandomColor()

    board.append(circle)
}

function getRandomNumber(min, max) {
   return Math.round(Math.random() * (max-min) + min)
}

function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)]
 }



  function winTheGame() {
    function kill() {
        const circle =   document.querySelector('.circle')
        if (circle){
            circle.click()
        }
    }
    setInterval(kill, 75)
  }

document.addEventListener('mousemove', parallax)

function parallax(e) {
    this.querySelectorAll('.layer').forEach(layer => {
        const speed = layer.getAttribute('data-speed')

        const x = (window.innerWidth =e.pageX*speed)/100
        const y = (window.innerHeight =e.pageY*speed)/100

        layer.style.transform = `translateX(${x}px) translateY(${y}px)`
    })
}