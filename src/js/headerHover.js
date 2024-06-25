const detail = document.querySelectorAll('.inner');
const header = document.querySelector('header');
const menuTitle = document.querySelectorAll('.menu--title');

const hoverEvent = (event) => {
  event.stopPropagation()
   detail.forEach( element => {
     element.classList.add('opacity--one')
     header.style.backgroundColor = 'rgba(54, 53, 53, 1)';
     element.addEventListener('mouseenter', hoverEvent)
   });
   menuTitle.forEach( (element,index) => {
     if (index !== menuTitle.length -1) {
       element.classList.add('border--right--white')
     }
   });
}

const leaveEvent = (event) => {
  event.stopPropagation()
  detail.forEach( element => {
    element.classList.remove('opacity--one')
    header.style.backgroundColor = '';
    element.addEventListener('mouseleave', leaveEvent)
  });
  menuTitle.forEach( element => element.classList.remove('border--right--white'));
}


const headerHover = () => {
  const titles = document.querySelectorAll('.title');
  titles.forEach( title => {
    title.addEventListener('mouseenter', hoverEvent);
    title.addEventListener('mouseleave', leaveEvent);
  })
}

headerHover();
