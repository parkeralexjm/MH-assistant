import React from "react"
import { armorData } from '../data/data'

function Equipment({ characterEquip, setCharacterEquip }) {
  // console.log(characterEquip)

  return (
    <section id="equipment" className="bg-opacity-50 bg-slate-300">
      <div className="flex flex-col layout">
        <h1>Gearset</h1>
        <div className="character-equipment">
          <div className="flex justify-around">
            {characterEquip.weapon ?
              <>
                <h4>{characterEquip.weapon.stats.name}</h4>
                <h4>{characterEquip.head.stats.name}</h4>
                <h4>{characterEquip.chest.stats.name}</h4>
                <h4>{characterEquip.hands.stats.name}</h4>
                <h4>{characterEquip.waist.stats.name}</h4>
                <h4>{characterEquip.legs.stats.name}</h4>
              </>
              :
              <h1>Loading...</h1>
            }
          </div>
        </div>
      </div>
    </section>
  )
}

export default Equipment