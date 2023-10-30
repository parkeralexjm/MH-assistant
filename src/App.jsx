import { useEffect, useState } from 'react'
import './App.css'
import { armorData, weaponData } from './data/data'
import Character from './components/Character'
import Equipment from './components/Equipment'
import Header from './components/Header'

function App() {
  const [characterEquip, setCharacterEquip] = useState({})
  // console.log(armorData)
  // Get character equipment from localStorage if it exists else set it to an empty equipment set
  useEffect(() => {
    localStorage.getItem("character_equip")
      ?
      setCharacterEquip(localStorage.getItem("character_equip"))
      :
      setCharacterEquip(
        {
          "weapon": weaponData[0].swordAndShield.jagrasedge[0],
          "head": armorData.leather.head,
          "chest": armorData.leather.chest,
          "hands": armorData.leather.hands,
          "waist": armorData.leather.waist,
          "legs": armorData.leather.legs
        }
      )
  }, [])

  return (
    <>
      <Header />
      <Character characterEquip={characterEquip} />
      <Equipment characterEquip={characterEquip} setCharacterEquip={setCharacterEquip} />
      <h3>Home</h3>
      <h4>Home</h4>
      <h5>Home</h5>
    </>
  )
}

export default App
