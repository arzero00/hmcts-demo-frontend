import {useState, useEffect} from 'react'
import { useTask, useDeleteTask, useDeleteTask1,useTasks1 } from '@/hooks/useTasks';
import {useTaskStore} from '@/stores/useTestingStore'

function TestingComponent(){
    const { selectedUserId } = useTaskStore(); // From Zustand
    const [title, setTitle] = useState('Testing Title')
    const [count, setCount] = useState(0)
    //const { data} = useTask('352');
    //const deleteMutation = useDeleteTask();
    const deleteMutation1 = useDeleteTask1('worker-id1');
    const { data: tasks, isLoading, error } = useTasks1('worker-id1');
    //deleteMutation.mutate('354')
    //deleteMutation1.mutate('552')
    //console.log(data);
    //console.log('a');


    useEffect(() => {

        //console.log("selectedUserId:" + selectedUserId)
        //deleteMutation1.mutate(552)
        const intervalId = setInterval(() => {
            setCount((count) => count+1);
        }, 1000);

        return ()=>{
            clearInterval(intervalId);
            console.log('clear');
        }

    },[])

//     useEffect(() => {
//         // 1. Start the timer
//         const intervalId = setInterval(() => {
//           setCount((count) => count + 1);
//         }, 1000);
//
//
//         return () => {
//           clearInterval(intervalId);
//         };
//       }, []); // 3. Empty dependency array means this runs once on mount
    if (isLoading) return <p>Loading...</p>;
    return (
        <div>
            <h1
                onClick={()=>
                  setCount(() => count+1)
                }>
                This is {title} {count}
            </h1>
            <h1>Is Loading:  {tasks.title}</h1>
        </div>
    )
}


export default TestingComponent