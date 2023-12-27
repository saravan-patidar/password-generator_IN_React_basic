import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAdd ,setNumberAdd] = useState(false);
  const [charAdd, setCharAdd] = useState(false);
  const [password,setPassword] = useState();
  const referPassword = useRef();

  const passwordGenerator = useCallback(()=>{
    let pass='';
    let str= 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
    if(numberAdd) str+= "0123456789";
    if(charAdd) str+= "!@#$%^&*(){}_-+";

    for(let i=0;i<length;i++){
      let char = Math.floor(Math.random()*str.length+1);
      pass += str.charAt(char);
      setPassword(pass);
    }
  },[length,numberAdd,charAdd,setPassword]);

  const copyPassword =useCallback(()=>{
    // window.navigator.clipboard.writeText(password);
    referPassword.current?.select();
    referPassword.current?.selectionRange(0,50);
  },[password])

  useEffect(()=>{ passwordGenerator()},[length,numberAdd,charAdd])

  return (
    <>
      <center className="bg-emerald-400 p-4 rounded-md shadow-xl">
        <h1 className="text-3xl font-bold">Password Generator</h1>
        <div className="p-2">
          <input type="text" value={password} ref={referPassword} readOnly className="border-2 bg-gray-500 text-white font-bold px-2 py-1 rounded-s-xl" />
          <button className="bg-sky-500 text-white py-1 rounded-none rounded-e-xl" onClick={copyPassword}>Copy</button>
        </div>
        <div className="conet">
          <div className="bg-blue-200/40 m-2 p-1 rounded-full flex justify-evenly">
            <input type="range" min='8' max='40' value={length} onChange={(e)=>{setLength(e.target.value)}}/>
            <label >Length: {length}</label>
          </div>
          <div className="w-3/2 m-3 p-2 ">
            <input type="checkbox" id='number' onClick={() => { setNumberAdd((prev) => !prev) }} />
            <label htmlFor='number' className="px-2 py-0.5 ml-1 mr-4 text-black rounded-full bg-gray-300 font-semibold" >Numbers</label>
            <input type="checkbox" id="char" onClick={()=>{setCharAdd((prev)=> !prev)}} />
            <label htmlFor='char' className="px-2 py-0.5 ml-1 mr-4 text-black rounded-full bg-gray-300 font-semibold" >Characters</label>
          </div>
        </div>
      </center>

    </>
  );
}

export default App;
