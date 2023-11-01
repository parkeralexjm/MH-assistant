import React, { useState } from 'react'
import { armorData, weaponData } from '../data/data'
import Armor from './Armor'
import Weapons from './Weapons'

function GearDisplay({ characterEquip, setCharacterEquip }) {
  const [displayType, setDisplayType] = useState('armor')
  const [filter, setFilter] = useState({
    damage: '',
    defence: '',

  })

  const TypeButton = ({ children, type }) => {
    return (
      <button className={displayType == type ? 'text-green-500' : 'text-black' + ""} onClick={() => setDisplayType(type)}>{children}</button>
    )
  }

  return (
    <>
      <h4>GearDisplay</h4>
      <div>
        <TypeButton type='weapon'>Weapon</TypeButton>
        <TypeButton type='armor'>Armor</TypeButton>
      </div>
      {displayType === 'weapon'
        ?
        <div>
          <Weapons weaponData={weaponData} characterEquip={characterEquip} setCharacterEquip={setCharacterEquip} />
        </div>
        :
        <div>
          <Armor armorData={armorData} characterEquip={characterEquip} setCharacterEquip={setCharacterEquip} />
        </div>
      }
    </>
  )
}

export default GearDisplay