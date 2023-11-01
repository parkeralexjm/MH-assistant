import { useEffect, useState } from "react"
import { defenceData } from "../data/data"


function Character({ characterEquip }) {
  // Initialise characterStats as blanks
  const [characterStats, setCharacterStats] = useState({
    attack: 0,
    element: '',
    eleDmg: 0,
    defence: 0
  })

  useEffect(() => {
    if (characterEquip.weapon) {
      // Take the grade of each weapon and cross reference with the defence number data
      const calcDefence = (
        defenceData[characterEquip.head.grade] +
        defenceData[characterEquip.chest.grade] +
        defenceData[characterEquip.hands.grade] +
        defenceData[characterEquip.legs.grade] +
        defenceData[characterEquip.waist.grade]
      )
      setCharacterStats({ ...characterStats, attack: characterEquip.weapon.attack, element: characterEquip.weapon.element, eleDmg: characterEquip.weapon.eleDmg, defence: calcDefence })
    }
  }, [characterEquip])

  // console.log(characterStats)
  return (
    <section id="character" className="bg-amber-100">
      <div className="flex flex-col layout">
        <h1>Character</h1>
        <div className="flex flex-col w-1/2 p-2 bg-opacity-50 rounded bg-slate-300 character-stats">
          <div className="flex justify-between character-attack">
            <h3>Attack</h3>
            <h3>{characterStats.attack}</h3>
          </div>
          <div className="flex justify-between character-element">
            <h3>Element</h3>
            <div className="flex items-center">
              <h4>{characterStats.element}</h4>
              <h3>{characterStats.eleDmg}</h3>
            </div>
          </div>
          <div className="flex justify-between character-defence">
            <h3>Defence</h3>
            <h3>{characterStats.defence}</h3>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Character