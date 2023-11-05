import React, { useState } from 'react'
import { armorData, weaponData, skillData } from '../data/data'
import makeAnimated from 'react-select/animated'
import Armor from './Armor'
import Weapons from './Weapons'
import Select from 'react-select'

function GearDisplay({ characterEquip, setCharacterEquip }) {
  const [displayType, setDisplayType] = useState('armor')
  const [selectedOptions, setSelectedOptions] = useState([])

  const animatedComponents = makeAnimated()

  const skillOptions = [
    skillData.map((skill) => {
      return { value: Object.keys(skill)[0].toLowerCase().replace(/\s/g, ''), label: Object.keys(skill)[0] }
    })
  ]

  const handleSelect = (data) => {
    setSelectedOptions(data)
  }

  const TypeButton = ({ children, type }) => {
    return (
      <button className={displayType == type ? 'text-green-500' : 'text-black' + ""} onClick={() => setDisplayType(type)}>{children}</button>
    )
  }

  const colorStyles = {
    control: (styles, { isFocused, isHovered }) => {
      return {
        ...styles,
        backgroundColor: 'transparent',
        boxShadow: isFocused ? 'pink' : 'blue',
        border: isFocused ? 'pink' : 'blue'
      }
    }
    // option: (styles, { data, isFocused, isDisabled, isSelected }) => {
    //   return { ...styles, color: data.color }
    // },
    // singleValue: (styles, { data }) => {
    //   return { ...styles, color: data.color }
  }


  return (
    <>
      <h4>GearDisplay</h4>
      <Select
        placeholder="Select skills..."
        isMulti
        name="skills"
        options={skillOptions[0]}
        components={animatedComponents}
        className="basic-multi-select"
        classNamePrefix="select"
        styles={colorStyles}
        value={selectedOptions}
        onChange={handleSelect}
      />
      <div>
        <TypeButton type='weapon'>Weapon</TypeButton>
        <TypeButton type='armor'>Armor</TypeButton>
      </div>
      {displayType === 'weapon'
        ?
        <div>
          <Weapons selectedOptions={selectedOptions} weaponData={weaponData} characterEquip={characterEquip} setCharacterEquip={setCharacterEquip} />
        </div>
        :
        <div>
          <Armor selectedOptions={selectedOptions} armorData={armorData} characterEquip={characterEquip} setCharacterEquip={setCharacterEquip} />
        </div>
      }
    </>
  )
}

export default GearDisplay