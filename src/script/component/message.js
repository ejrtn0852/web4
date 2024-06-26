import Element from "./Element.js";
import MessageFetch from "../fetcher/MessageFetch.js";

const message = async () => {

  const messageList = await MessageFetch();


  const updateEventMessage = () => {
    const textAll = document.querySelectorAll('.inner--target--img');
    textAll.forEach((element, i) => {
      const {text, date} = messageList[i]

      const innerTextList = textAll[i].querySelectorAll('.inner--text');
      innerTextList.forEach( (innerText, elementIndex) => {
        innerText.textContent = (elementIndex === 2) ? date[0] : text[elementIndex] || '';
      })
    });
  }
  return {updateEventMessage};
}


export default message;


//Inner--text--wrap > inner--text *3 이런식으로 되어있는데 innerText