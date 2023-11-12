import { useState } from 'react'
import './App.css'
import { armorData, weaponData } from './data/data'
import Header from './components/Header'
import Character from './components/Character'
import Equipment from './components/Equipment'
import GearDisplay from './components/GearDisplay'
import background from './assets/rock-background.jpg'

function App() {
  const [characterEquip, setCharacterEquip] = useState(
    // Get character equipment from localStorage if it exists else set it to an empty equipment set
    localStorage.getItem("default_character_equip")
      ?
      JSON.parse(localStorage.getItem("default_character_equip"))
      :
      {
        weapon: { "stats": weaponData[0]["Sword And Shield"].jagrasedge, "grade": weaponData[0]["Sword And Shield"].jagrasedge[0].startGrade, "set": "swordandshield" },
        head: { "stats": armorData[2].kulu[0], "grade": armorData[0].leather[0].startGrade, "set": "leather" },
        chest: { "stats": armorData[3].pukei[1], "grade": armorData[0].leather[1].startGrade, "set": "leather" },
        hands: { "stats": armorData[1].jagras[2], "grade": armorData[0].leather[2].startGrade, "set": "leather" },
        waist: { "stats": armorData[0].leather[3], "grade": armorData[0].leather[3].startGrade, "set": "leather" },
        legs: { "stats": armorData[0].leather[4], "grade": armorData[0].leather[4].startGrade, "set": "leather" }
      }
  )

  return (
    <>
      <Header />
      <div className='flex p-2 bg-center bg-cover md:flex-col' style={{ backgroundImage: `linear-gradient(rgba(255, 251, 235,0.8), rgba(255, 251, 235,0.8)), url(${background})` }}>
        <Character characterEquip={characterEquip} setCharacterEquip={setCharacterEquip} />
        <Equipment characterEquip={characterEquip} setCharacterEquip={setCharacterEquip} />
      </div>
      <GearDisplay characterEquip={characterEquip} setCharacterEquip={setCharacterEquip} />
    </>
  )
}

export default App
