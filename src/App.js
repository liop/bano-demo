import './App.css';
import { useState, useRef } from 'react'
import RegionSelect from './components/RegionSelect/RegionSelect.jsx'
import RegionSelectHook from './components/RegionSelect/RegionSelect_hooks'

function App() {
  const selectEl = useRef(null)
  const [region, setRegion] = useState("")
  const showRegionSelect = () => {
    selectEl.current.show()
  }
  const handleRegionSelect = (reg) => {
    setRegion(reg)
    selectEl.current.hiden()
  }

  const [region2, setRegion2] = useState("")
  const [show, setShow] = useState(false)
  const showRegionSelect2 = () => {
    setShow(true)
  }
  const handleRegionSelect2 = (reg) => {
    setRegion2(reg)
    setShow(false)
  }

  return (
    <div className="App">
      <section className="content">
        <button className='content-btn' onClick={()=>showRegionSelect()} >select region</button>
        <p>Region is: {region}</p>
        <RegionSelect ref={selectEl} onSelect={handleRegionSelect} />
        <br/>
        <button className='content-btn' onClick={()=>showRegionSelect2()} >select region by hooks</button>
        <p>Region by hooks is: {region2}</p>
        <RegionSelectHook show={show} onSelect={handleRegionSelect2} onShowChange={setShow} />
        </section>
    </div>
  );
}

export default App;
