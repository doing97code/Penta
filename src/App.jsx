import React from 'react'
import { Link } from 'react-router-dom'
// import Allroutehandle from './Allroutehandle'
import { BrowserRouter } from 'react-router-dom'
import Allroutehandle from './context/Allroutehandle'
import Home from './context/Home'
// import './app.css'


function App() {

  // const [count, setCount] = useState(0);
  // const [list, setList] = useState(['mango', 'lichi', 'pineapple', 'jackfruit']);
  // const [showlist, setShowlist] = useState(false);
  // const [listitemvalue, setlistitemvalue] = useState('');
  // const [viewLocalData, setviewLocalData] = useState(false);


  // function incrse(prevcount) {
  //   setCount(prevcount + 1);
  // }

  // function resetToZero() {
  //   setCount(0);
  // }

  // function showMyList() {
  //   setShowlist(!showlist);
  // }

  // function addlist() {
  //   if (!listitemvalue) {
  //     window.alert("Enter your data ")
  //     return;
  //   }
  //   setList([...list, listitemvalue])
  //   setlistitemvalue('')
  //   setLocalStorage(listitemvalue);

  // }

  // function removelist() {
  //   setList([]);
  // }

  // function setLocalStorage(myitem) {

  //   const newdata = JSON.parse(localStorage.getItem("myData"))   // get + newval
  //   if (!myitem) {
  //     window.alert("Enter your data ")
  //     return;
  //   }

  //   if (newdata) {
  //     const newItem = [...newdata, myitem]
  //     const stringData = JSON.stringify(newItem)
  //     localStorage.setItem('myData', stringData)
  //   } else {
  //     const newItem2 = [...list, myitem]
  //     const stringData = JSON.stringify(newItem2)
  //     localStorage.setItem('myData', stringData)
  //   }


  // }

  // function viewItemFromLocalStorage() {
  //   console.log(localStorage.getItem('myData'));
  //   console.log(typeof (localStorage.getItem('myData')));
  //   setviewLocalData(!viewLocalData)


  // }

  // const localStorageData = JSON.parse(localStorage.getItem("myData"))

  return (
    <div  >
      {/* <h1>{count}</h1>
      <button onClick={() => incrse(count)}>Incrs</button>
     
      <button onClick={() => resetToZero()}>reset</button>

   
      <br />
      <h1>{list}</h1>
      <button onClick={showMyList}>showList</button>
      <br />
      <hr />
     
      <br />
      <hr />
      <button onClick={() => removelist()}>removeList</button>
      <br />

      <button onClick={addlist}>addlist</button>
      {
        showlist && (
          <ol>
            {list.map((item, index) => (
              <li key={index}>{item}</li>
            ))

            }
          </ol>
        )
      }


      <MyResult />
      <br />
      <hr /> */}
       {/* <h1>Your Thoughts, Your Space</h1>
      <input type="text" value={listitemvalue} onChange={(e) => setlistitemvalue(e.target.value)} />
    
      <button onClick={() => setLocalStorage()}>setLifeTime</button>
      <button onClick={() => viewItemFromLocalStorage()}>viewdata</button>

      <hr />
      <ol>
        {
          localStorageData.map((item, index) => (
            <li key={index}>{item}</li>
          ))
        }
      </ol> */}






      {/* <h1>Hello bro</h1> */}

      <BrowserRouter>
          {/* <div className='flex justify-center items-center gap-5 flex-row p-2 m-2   text-black text-pretty text-1xl font-semibold capitalize' >
            
              <Link to='/' className='bg-[#F52549] text-white p-2 rounded' >Home</Link>
              <Link to='/about' className='bg-[#F52549] text-white p-2 rounded'>viewNotes</Link>
              
          </div> */}
          <Allroutehandle />
        </BrowserRouter>

       
    
    </div>
  )
}

export default App

