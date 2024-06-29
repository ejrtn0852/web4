const MessageFetch = async () => {
  return await (await fetch(`../message.json`)).json();
}

export default MessageFetch;
