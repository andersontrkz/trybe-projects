window.onload = function () {
  randomizePalette();

  addPixel(5);

  changeClass();

  paintPixel();

  clearBoard();

  defineSize();
}

let palette = document.getElementsByClassName('color');
let pixel = document.getElementsByClassName('pixel');
let selectedColor = 1;

//https://pt.stackoverflow.com/questions/187803/como-criar-div-com-javascript

function addPixel (size) {
  for (let indice = 0; indice < size; indice++) {
    createLine();
    for (let index = 0; index < size; index++) {
      populingLines(indice);
    }
  }
  pixelBoardSize (size);
}

function pixelBoardSize (size) {
  let root = document.documentElement;
  let sizeTotal = (size * 40) + (size * 2)

  root.style.setProperty('--sizeTotal', `${sizeTotal}px`);
}

function populingLines (index) {
  let pixelBoard = document.getElementsByClassName("line");
  let newPixel = document.createElement("div");

  newPixel.setAttribute('class', 'pixel color5');

  pixelBoard[index].appendChild(newPixel);
}

function createLine () {
  let pixelBoard = document.getElementById("pixel-board");
  let line = document.createElement("div");

  line.setAttribute('class', 'line');

  pixelBoard.appendChild(line);
}

function changeClass () {
  palette[0].addEventListener('click', function () {
    changeColor(palette[0]);
    
    //addClassName
    palette[0].className = "color color1 selected";
    selectedColor = 1;
    //resetClassName
    palette[1].className = "color color2";
    palette[2].className = "color color3";
    palette[3].className = "color color4";
  })

  palette[1].addEventListener('click', function () {
    changeColor(palette[1]);

    //addClassName
    palette[1].className = "color color2 selected";
    selectedColor = 2;
    //resetClassName
    palette[0].className = "color color1";
    palette[2].className = "color color3";
    palette[3].className = "color color4";
  })

  palette[2].addEventListener('click', function () {
    changeColor(palette[2]);

    //addClassName
    palette[2].className = "color color3 selected";
    selectedColor = 3;
    //resetClassName
    palette[0].className = "color color1";
    palette[1].className = "color color2";
    palette[3].className = "color color4";
  })

  palette[3].addEventListener('click', function () {
    changeColor(palette[3]);
    
    //addClassName
    palette[3].className = "color color4 selected";
    selectedColor = 4;
    //resetClassName
    palette[0].className = "color color1";
    palette[2].className = "color color3";
    palette[1].className = "color color2";
  })
}

function changeColor (palette) {
  window.getComputedStyle(palette).getPropertyValue("background-color");
  paintPixel () 
}

function paintPixel () {
  for (let index = 0; index < pixel.length; index ++) {
    pixel[index].addEventListener('click', function () {
      switch (selectedColor) {
        case 1:
          console.log(pixel.length)
          pixel[index].className = "pixel color1"
          break;
        
        case 2:
          pixel[index].className = "pixel color2"
          break;
      
        case 3:
          pixel[index].className = "pixel color3"
          break;

        case 4:
          pixel[index].className = "pixel color4"
          break;
      
        default:
          pixel[index].className = "pixel color5"
          break;
      }
    })
  }
}

function clearBoard () {
  let clearButton = document.getElementById('clear-board');

  clearButton.addEventListener('click', function () {
    for (let indice = 0; indice < pixel.length; indice++) {

      pixel[indice].setAttribute('class', 'pixel color5');
    }
  })
}

function defineSize () {
  let buttonSize = document.getElementById('generate-board');
  let size = document.getElementById('board-size');

  buttonSize.addEventListener('click', function () {
    let sizeValue = size.value

    if (sizeValue == "") {
      alert('Board inválido!')
    } else if (sizeValue < 5) {
      removePixels();
      size.value = 5;
      addPixel(size.value);
    } else if (sizeValue > 50) {
      removePixels()
      size.value = 50;
      addPixel(size.value);
    } else if ((sizeValue >= 5) && (sizeValue <= 50)){
      removePixels()
      addPixel(sizeValue)
    }
  })
}

function ramdomizeColor () {
  let rgb = [];

  for (let indice = 0; indice < 3; indice++){
    rgb.push((Math.random()) * 255);
  }

  return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`
}

//https://pt.stackoverflow.com/questions/348981/como-colocar-valor-da-variavel-javascript-no-css
function randomizePalette () {
  let root = document.documentElement;

  root.style.setProperty('--color2', ramdomizeColor());
  root.style.setProperty('--color3', ramdomizeColor());
  root.style.setProperty('--color4', ramdomizeColor());
}

function removePixels() {
  let remove = document.getElementById('pixel-board');

  remove.innerText = "";
}
