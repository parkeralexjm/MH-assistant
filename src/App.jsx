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
          "weapon": { "stats": weaponData[0]["Sword And Shield"].jagrasedge, "grade": weaponData[0]["Sword And Shield"].jagrasedge[0].startGrade },
          "head": { "stats": armorData[0].leather[0], "grade": armorData[0].leather[0].startGrade },
          "chest": { "stats": armorData[0].leather[1], "grade": armorData[0].leather[1].startGrade },
          "hands": { "stats": armorData[0].leather[2], "grade": armorData[0].leather[2].startGrade },
          "waist": { "stats": armorData[0].leather[3], "grade": armorData[0].leather[3].startGrade },
          "legs": { "stats": armorData[0].leather[4], "grade": armorData[0].leather[4].startGrade }
        }
      )
  }, [])

  return (
    <>
      <Header />
      <Character characterEquip={characterEquip} setCharacterEquip={setCharacterEquip} />
      <Equipment characterEquip={characterEquip} setCharacterEquip={setCharacterEquip} />
      <GearDisplay characterEquip={characterEquip} setCharacterEquip={setCharacterEquip} />
      <h4>Home</h4>
      <h5>Home</h5>
    </>
  )
}

export default App
