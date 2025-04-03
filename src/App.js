import './App.css';
import Column from "./Column";
import {Button} from "reactstrap";
import {useEffect, useState} from "react";
import CreateModal from "./CreateModal";
import axios from "axios";

const initialTasks = [
    {
        "description": "🌺🌹🌷",
        "priority": 10,
        "status": "todo",
        "_id": "65cf5c709868156389d882ad",
        "name": "🏝️🌳🌲",
    },
    {
        "description": "dragon",
        "priority": 4,
        "status": "review",
        "_id": "65cf5c839868156389d882af",

        "name": "🐲🐲🐲",
    },
]



function App() {
    //state for modal
    const [openCreateMode, setOpenCreateMode] = useState(false);

    //state for tasks
    const [tasks, setTasks] = useState(initialTasks);

    //state for statuses
    const [statuses, setStatuses] = useState(['todo', 'progress', 'review', 'done']);


    //const for priority
    const priorities = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    //receive task with get request https://expressjs-server.vercel.app/tasks

    const getTasks = () => {
        axios.get('https://expressjs-server.vercel.app/tasks')
            .then(res => {
                setTasks(res.data)
            })
            .catch(error => console.log(error))
    }

    //only ones when receive data from server to render
    useEffect(() => {
        getTasks();
    }, []);

    //create async function -> new task
    const postTask = (obj) => {
        axios.post('https://expressjs-server.vercel.app/tasks', {...obj}) //{...obj}-light copy of object
            .then(() => {
                getTasks(); // receive all tasks include new
            })
            .catch(error => console.log(error))
    }

    const deleteTask = (id) => {
        axios.delete(`https://expressjs-server.vercel.app/tasks/${id}`)
            .then(() => {
                getTasks(); // receive all tasks include new
            })
            .catch(error => console.log(error))
    }

    const editTask = (id, task) => {
        axios.patch(`https://expressjs-server.vercel.app/tasks/${id}`, {...task})
            .then(() => {
                getTasks(); // receive all tasks include new
            })
            .catch(error => console.log(error))
    }

    const moveTask = (id, status, direction) => {
        const corrector = (direction === 'left') ? -1 : 1;
        const newStatusIdx = statuses.indexOf(status) + corrector;
        axios.patch(
            `https://expressjs-server.vercel.app/tasks/${id}`,

            // const [statuses, setStatuses] = useState(['todo', 'progress', 'review', 'done']);

            {status: statuses[newStatusIdx]}
        )
            .then(res => {
                getTasks();
            })
            .catch(error => console.log(error))
    }

    return (
        <div className="App">
            <h1>Kanban Todo App</h1>

            <Button
                onClick={() => setOpenCreateMode(true)}
                color="primary"
                outline>
                Create todo
            </Button>
            {openCreateMode &&
                <CreateModal
                    openCreateMode={openCreateMode}
                    setOpenCreateMode={setOpenCreateMode} //toggle to false
                    //todo change tasks to function
                    tasks={tasks}
                    statuses={statuses}
                    priorities={priorities}
                    postTask={postTask}
                />
            }
            <div>
                {statuses.map(status =>
                    <Column
                        key={Math.random()}
                        status={status}
                        tasks={tasks}
                        statuses={statuses}
                        priorities={priorities}
                        setOpenCreateMode={setOpenCreateMode}
                        deleteTask={deleteTask}
                        editTask={editTask}
                        moveTask={moveTask}
                    />
                )}


            </div>
        </div>
    );
}

export default App;
