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
                <h1>{characterEquip.weapon.weaponName}</h1>
                <h1>{characterEquip.head.name}</h1>
                <h1>{characterEquip.chest.name}</h1>
                <h1>{characterEquip.hands.name}</h1>
                <h1>{characterEquip.waist.name}</h1>
                <h1>{characterEquip.legs.name}</h1>
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