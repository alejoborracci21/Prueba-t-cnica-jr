import './App.css'
import addtask from './hooks/addtask'

function App() {

  
  return (
    <>
      <button onClick={() => addtask('hola')}>addtask</button>
    </>
  )
}

export default App
