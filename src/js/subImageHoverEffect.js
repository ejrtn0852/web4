const viewImg = document.querySelectorAll('.small--view--img');
const viewDes = document.querySelectorAll('.small--view--description');

const hoverEvent = (event, element) => {
  const currentTarget = event.target;
  const nextElement = event.target.nextElementSibling;
  const prevElement = event.target.previousElementSibling;
  if (element.classList.contains('small--view--img')) {
    currentTarget.classList.add('opacity--one');
    nextElement.classList.add('opacity--one');
  } else {
    currentTarget.classList.add('opacity--one');
    prevElement.classList.add('opacity--one');
  }
}

const leaveEvent = (event, element) => {
  const currentTarget = event.target;
  const nextElement = event.target.nextElementSibling;
  const prevElement = event.target.previousElementSibling;
  if (element.classList.contains('small--view--img')) {
    currentTarget.classList.remove('opacity--one');
    nextElement.classList.remove('opacity--one');
  } else {
    currentTarget.classList.remove('opacity--one');
    prevElement.classList.remove('opacity--one');
  }
}

viewImg.forEach(targetImg => {
  targetImg.addEventListener('mouseenter', (event) => hoverEvent(event,targetImg));
  targetImg.addEventListener('mouseleave', (event) => leaveEvent(event,targetImg));
});

viewDes.forEach(targetDes => {
  targetDes.addEventListener('mouseenter', (event) => hoverEvent(event,targetDes));
  targetDes.addEventListener('mouseleave', (event) => leaveEvent(event,targetDes));
});

