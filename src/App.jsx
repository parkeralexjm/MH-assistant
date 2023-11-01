import { useEffect, useState } from 'react'
import './App.css'
import { armorData, weaponData } from './data/data'
import Header from './components/Header'
import Character from './components/Character'
import Equipment from './components/Equipment'
import GearDisplay from './components/GearDisplay'

function App() {
  const [characterEquip, setCharacterEquip] = useState({})
  // Get character equipment from localStorage if it exists else set it to an empty equipment set
  useEffect(() => {
    localStorage.getItem("character_equip")
      ?
      setCharacterEquip(localStorage.getItem("character_equip"))
      :
      setCharacterEquip(
        {
          "weapon": { "stats": weaponData[0]["Sword And Shield"].jagrasedge[0] },
          "head": { "stats": armorData[0].leather[0], "grade": 0 },
          "chest": { "stats": armorData[0].leather[1], "grade": 2 },
          "hands": { "stats": armorData[0].leather[2], "grade": 4 },
          "waist": { "stats": armorData[0].leather[3], "grade": 2 },
          "legs": { "stats": armorData[0].leather[4], "grade": 3 }
        }
      )
  }, [])

  return (
    <>
      <Header />
      <Character characterEquip={characterEquip} />
      <Equipment characterEquip={characterEquip} setCharacterEquip={setCharacterEquip} />
      <GearDisplay characterEquip={characterEquip} setCharacterEquip={setCharacterEquip} />
      <h4>Home</h4>
      <h5>Home</h5>
    </>
  )
}

export default App
