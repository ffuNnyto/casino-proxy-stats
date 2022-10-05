

import { useContext, useEffect } from 'react';
import Shell from './components/shell';
import { useDispatch, useSelector } from 'react-redux'
import { WebsocketContext } from './contexts/webSocketContext';
import { setHacksawDb, setPragmaticDb, handleConnectedApp } from './store/features/app.slice';

function App({ component }) {

  const dispacth = useDispatch();
  const storeApp = useSelector((state) => state.app);
  const socket = useContext(WebsocketContext);

  socket.onopen = () => {
    dispacth(handleConnectedApp());
    socket.send('REQUEST_DATA')
  }

  socket.onmessage = (message) => {
    const data = JSON.parse(message.data);
    dispacth(setHacksawDb(data.hacksawdb))
    dispacth(setPragmaticDb(data.pragmaticdb));

  }






  useEffect(() => {



    return () => {
      //dispacth(setHacksawDb(JSON.parse(process.env.hacksawdb)));
    }
  }, [])


  return (
    <>
      <Shell>
        {component}
      </Shell>
    </>
  )
}

export default App
