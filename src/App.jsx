import { useState } from 'react'
import './App.css'
import { armorData, weaponData, defaultSets } from './data/data'
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
      defaultSets
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
