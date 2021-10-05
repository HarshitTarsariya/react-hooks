import './App.css';
import React,{useState,useEffect,useMemo,useRef,useReducer} from 'react';
import Usecontext from './Usecontext';
import UsecontextOutsideProvider from './UsecontextOutsideProvider';
import Todo from './Todo';

// CUSTOM HOOKS
// Underhood it uses the react inbuilt hook and simulate similar thing as react inbuilt hook for different usecase

// USECALLBACK
// It is similar to useMemo where useMemo get the values in return while useCallback can get function in return type
// This is required when rerender occurs then function will be created again but will be same as before but there referncial equality will be different due to which useEffect(which depends on that function) gets called again and again slowing down rerenders

// USEREDUCER
// It is similar to single source redux state management but its in react hook ,
// it is state management hook , just single dispatch function and handle all requirement across all childs
// Below is Simple TODO to add, remove and toggle state
export const ACTIONS={
  ADD:'add',
  TOGGLE:'toggle',
  REMOVE:'remove'
}

function newTodo(title){
  return {id:Date.now(), title:title, completed:false};
}

function reducer(todos,action){
  switch(action.type){
    case ACTIONS.ADD:
      return [...todos,newTodo(action.payload.title)];
    
    case ACTIONS.TOGGLE:
      return todos.map(todo=>{
        if(todo.id===action.payload.id)
          return {...todo,completed:!todo.completed};
        return todo;
      })
    
    case ACTIONS.REMOVE:
      return todos.filter(todo=>todo.id!=action.payload.id);
    
    default:
      return todos;
  }
}

function App() {
  const [title,setTitle]=useState('');
  const [todos,dispatch]=useReducer(reducer,[]);
  const handleSubmit=(e)=>{
    e.preventDefault();
    dispatch({
              type:ACTIONS.ADD,
              payload:{title:title}
            });
  }

  return (
    <center>
      <form onSubmit={handleSubmit}>
        <input type='text' value={title} onChange={(e)=>setTitle(e.target.value)}></input>
      </form>
      {
        todos.map(todo=>{
          return <Todo key={todo.id} todo={todo} dispatch={dispatch}/>
        })
      }
    </center>
  );
}

// USECONTEXT is providing a access to everthing passed in props in provider, to the all child components.
// export const themeContext=React.createContext();
// function App() {
//   const [dark,setTheme]=useState(true);

//   const toogleTheme=()=>{
//     setTheme(prev=>!prev);
//   }

//   return (
//     <center>
//       {/* <UsecontextOutsideProvider/> */}
//       <themeContext.Provider value={dark}>
//         <button onClick={toogleTheme}>Change Theme</button>
//         <Usecontext/>
//       </themeContext.Provider>
//     </center>
//   );
// }

//USEREF
//useRef is used to persist values between renders without causing rerenders(ie. setting values does not cause rerender as in useState),
// It also helps to get reference to tags in html or here JSX
// function App() {
//   const [name,setName]=useState('');
//   const prevName=useRef('Alex');
//   useEffect(()=>{
//     prevName.current='Bob';
//   },[name]);
//   return (
//     <div className="center">  
//       <input value={name} onChange={(e)=>{
//         setName(e.target.value)}}></input>
//       <div>My name is {prevName.current} </div>
//     </div>
//   );
// }




// USEMEMO
// function App() {
//   const [resource,setResource]=useState('posts');
//   const [num,setNum]=useState(1);

//   const num1=useMemo(()=>{  //Without useMemo getNum will also be called during change in change in resource but it is not needed, so useMemo will cache and will run only when arguement in [num] changes
//     return getNum(num);     //useMemo is good but caching everything will consume memory as it will have to store it, so use it when necessary or complex task is to be performed
//   },[num]);

//   console.log(num1);
//   return (
//     <div className="center">  
//       <button onClick={()=>setResource('posts')}><h1>posts</h1></button>
//       <button onClick={()=>setResource('profile')}><h1>profile</h1></button>
//       <button onClick={()=>setResource('message')}><h1>message</h1></button>
//       <button onClick={()=>setNum(prevNum=>prevNum+1)}><h1>+</h1></button>
//       <h1>{resource}</h1>
//     </div>
//   );
// }

// function getNum(num) {
//   let x=num*100;
//   for(let i=0;i<1000000;i++){}
//   return x;
// }


// USEEFFECT
// It will be called after the rendering occurs(after whole JSX element tree is rendered)
// function App() {
//   const [resource,setResource]=useState('posts');
//   console.log('1111'); // runs 1st

//   useEffect(()=>{
//     console.log(resource); //3rd when useEffect runs after 1st time and will be executed 2nd when useEffect runs for first

//     return ()=>{
//       console.log('Clean Up'); //2nd after resource changed and useEffect runs after first time and not first time
//     }
//   },[resource]);

//   return (
//     <div className="center">  
//       <button onClick={()=>setResource('posts')}><h1>posts</h1></button>
//       <button onClick={()=>setResource('profile')}><h1>profile</h1></button>
//       <button onClick={()=>setResource('message')}><h1>message</h1></button>
//       <h1>{resource}</h1>
//     </div>
//   );
// }




// USESTATE
// Update of state variables occurs only after rerender occurs
// function fn(){
//     console.log('in');
//     return 1;
// }

// When multiple setState are there then react batches and rerenders only once
// and update at that time

// function App() {
//   const [count,setCount]=useState(fn()); //calls fn every render , use ()=>fn() so that calls fn() only once during first render
//   console.log(count);
//   const decrement=()=>{
//     setCount(count-1);
//     console.log(count);
//     setCount(count-1);
//     console.log(count);
//   }
//   const increment=()=>{
//     setCount(count+1);
//   }

//   return (
//     <div className="center">  
//       <button onClick={decrement}><h1>-</h1></button>
//       <span><h1>{count}</h1></span>
//       <button onClick={increment}><h1>+</h1></button>
//     </div>
//   );
// }

export default App;
