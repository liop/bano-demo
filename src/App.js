import './App.css';
import { useState, useRef } from 'react'
import RegionSelect from './components/RegionSelect/RegionSelect.jsx'

function App() {
  let selectEl = useRef(null)
  let [region, setRegion] = useState("")
  const showRegionSelect = () => {
    selectEl.current.show()
  }
  const handleRegionSelect = (reg) => {
    setRegion(reg)
    selectEl.current.hiden()
  }
  return (
    <div className="App">
      <section className="content">
        <button className='content-btn' onClick={()=>showRegionSelect()} >select region</button>
        <p>Region is: {region}</p>
        <RegionSelect ref={selectEl} onSelect={handleRegionSelect} />
        </section>
    </div>
  );
}

export default App;
