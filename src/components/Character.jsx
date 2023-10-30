import { useState } from "react"


function Character({ characterEquip }) {
  console.log(characterEquip)

  const { attack, element } = characterEquip.weapon
  const [characterStats, setCharacterStats] = useState()

  return (
    <section id="character" className="bg-amber-100">
      <div className="flex flex-col layout">
        <h1>Character</h1>
        <div className="flex flex-col w-1/2 p-2 bg-opacity-50 rounded bg-slate-300 character-stats">
          <div className="flex justify-between character-attack">
            <h3>Attack</h3>
            <h3>{attack}</h3>
          </div>
          <div className="flex justify-between character-element">
            <h3>Element</h3>
            <div className="flex items-center">
              <h4>{element}</h4>
              <h3>100</h3>
            </div>
          </div>
          <div className="flex justify-between character-defence">
            <h3>Defence</h3>
            <h3>100</h3>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Character