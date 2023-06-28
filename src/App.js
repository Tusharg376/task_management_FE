import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import TodoList from './components/TodoList';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signin from './components/SignIn';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={<Signin/>}></Route>
          <Route path='/allTasks' element={<TodoList/>}></Route>
          <Route path='/user' element={<Signin/>}> </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
