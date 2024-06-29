const MessageFetch = async () => {
  return await (await fetch(`web4/message.json`)).json();
}

export default MessageFetch;
