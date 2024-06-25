const detail = document.querySelectorAll('.inner');
const menuWrap = document.querySelector('.menu--wrap');

const hoverEvent = () => {
   detail.forEach( element => {
     element.classList.add('opacity--one')
     menuWrap.style.backgroundColor = 'rgba(54, 53, 53, 0.9)';
     element.addEventListener('mouseenter', hoverEvent)
   });
}

const leaveEvent = () => {
  detail.forEach( element => {
    element.classList.remove('opacity--one')
    menuWrap.style.backgroundColor = '';
    element.addEventListener('mouseleave', leaveEvent)
  });
}

function headerHover () {
  const titles = document.querySelectorAll('.title');
  titles.forEach( title => {
    title.addEventListener('mouseenter', hoverEvent);
    title.addEventListener('mouseleave', leaveEvent);
  })
}

headerHover();
