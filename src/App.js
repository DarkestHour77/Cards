import {  useEffect, useState } from 'react';
import './App.css';
import Celebs from "./celebrities.json"

function App() {
  
const [selected,setSelected] = useState(null);
const [query,setQuery] = useState("");
const [users,setUsers] = useState(Celebs);


const toggle =(i)=>{
  if (selected === i){
    return setSelected(null)
  }

  setSelected(i)
}

function calculateAge(birthdate) {
  const birthDate = new Date(birthdate);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

const deleteUser = (celebs) => {
  setUsers(users.filter((user)=> user !==celebs));
  console.log (celebs)
};


  
return (
  <div className="App">
    

    <div className='accordion'>
    <div >
      <input className='searchbar' placeholder='Search Here' onChange={(e)=> setQuery(e.target.value)} value={query} />
    </div>
      {users.filter((celebs)=>{
        if(query === ""){
          return celebs;
        }else if (celebs.first.toLowerCase().includes(query.toLowerCase())){
          return celebs;
        }
      }).map((celebs,i) => (
        
          <div className='item' key={celebs.id} >
            <div className='title' onClick={()=> toggle(i)}>
              <strong>{celebs.first} {celebs.last}</strong>
              <strong>{selected === i ?'-':'+'}</strong>
            </div>
            <table>
              <div className={selected === i ?'contentshow':'content'}>
              <div >
                <tr >
                  <th className='data'>Age</th ><th className='data'>Gender</th><th className='data'>Country</th>
                </tr>
                <tr >
                  <td className='data'>{calculateAge(celebs.dob)}</td><td className='data'>{celebs.gender}</td><td className='data'>{celebs.country}</td>
                </tr>
              </div>
              </div>
              <div className={selected === i ?'contentshow':'content'}>
                <tr>
                  <th>Description</th>
                </tr>
                <tr>
                  <td>{celebs.description}</td>
                </tr>
                <button className='button' onClick={() => deleteUser(celebs)}>Delete</button>
                
              </div>
            </table>
            
          </div>
      
        
      ))}
    </div>
    

  </div>
);
}

export default App;
