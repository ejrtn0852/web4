import ImgSlider from "./ImgSlider.js";

const viewImg = document.querySelectorAll('.small--view--img');
const viewDes = document.querySelectorAll('.small--view--description');



const clickEvent = async (event, element) => {
  const currentTarget = event.target;
  const prevElement = event.target.previousElementSibling;
  if (element.classList.contains('small--view--img')) {
    viewImg.forEach( element => element.classList.remove('focus--border'))
    currentTarget.classList.add('focus--border');
  } else {
    prevElement.classList.add('focus--border');
  }
}

viewImg.forEach(element => {
  element.addEventListener('click', (event) => clickEvent(event, element));
})
viewDes.forEach(element => {
  element.addEventListener('click', (event) => clickEvent(event, element));
})

