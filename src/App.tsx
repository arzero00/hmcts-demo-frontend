import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import {useTaskStore} from './stores/useTestingStore.ts'
import TestingComponent from './components/TestingComponent.jsx'
import TaskDashboard from '@/components/TaskDashboard.tsx'
//console.log('before:', useTaskStore.getState());

//console.log('before:', useTaskStore.getState().count);
//console.log('before:', useTaskStore.getState().increment());
//console.log('before:', useTaskStore.getState().count);

//console.log('before:', useTaskStore.getState().selectedUserId);
//console.log('before:', useTaskStore.getState().setUserId('aaa'));
//console.log('before:', useTaskStore.getState().selectedUserId);

//console.log('before1:', useTaskStore.getState().selectedUserId);
//console.log('before2:', useTaskStore.setState({selectedUserId:'bbb'}));
//console.log('before3:', useTaskStore.getState().selectedUserId);
//console.log('before4:', useTaskStore.getState().that);

//console.log('before1:', useTaskStore.getState().nestLoop1.nestLoop1a.nestLoop1a1.a);


function App() {
  const [count1, setCount1] = useState(1)

  return (

    <>

        <TaskDashboard/>
<TestingComponent/>





    </>
  )
}

export default App
