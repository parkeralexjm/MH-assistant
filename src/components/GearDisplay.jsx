import React, { useState } from 'react'
import { armorData, weaponData, skillData } from '../data/data'
import makeAnimated from 'react-select/animated'
import Armor from './Armor'
import Weapons from './Weapons'
import Select from 'react-select'
import chroma from 'chroma-js'
import determineTextColor from '../lib/colors'

function GearDisplay({ characterEquip, setCharacterEquip }) {
  const [displayType, setDisplayType] = useState('armor')
  const [selectedOptions, setSelectedOptions] = useState([])

  const animatedComponents = makeAnimated()

  const skillOptions = [
    skillData.map((skill) => {
      return { value: skill.name.toLowerCase().replace(/\s/g, ''), label: skill.name, color: skill.color }
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
    control: (style, state) => ({
      ...style,
      backgroundColor: 'transparent',
      border: state.isFocused ? '2px solid #94a3b8' : '2px solid #cbd5e1', // Second option here is the default grey
      borderRadius: '5px',
      transition: 'border 0.2s', // Add a smooth transition for the border change
      '&:hover': {
        border: '2px solid #94a3b8', // Border styles on hover
      },
      boxShadow: 'none' // This removes tailwind box-shadow ring
    }),
    option: (styles, state) => {
      const color = determineTextColor(state.data.color)
      return {
        ...styles,
        backgroundColor: state.isSelected ? color : 'white',
        color: color,
        fontWeight: 600,
        transition: 'background-color 0.2s', // Add a smooth transition for the background color change
        '&:hover': {
          backgroundColor: chroma(color).alpha(0.1).hex(), // Background color on hover
          color: color, // Text color on hover
        },
      }
    },
    placeholder: (styles) => {
      return {
        ...styles,
        fontWeight: 600,
      }
    },
    multiValue: (styles, state) => {
      const color = determineTextColor(state.data.color)
      return {
        ...styles,
        backgroundColor: color
      }
    },
    multiValueLabel: (styles, state) => {
      return {
        ...styles,
        color: 'white'
      }
    },
    multiValueRemove: (style, state) => {
      const color = determineTextColor(state.data.color)
      return {
        ...style,
        backgroundColor: chroma(color).darken(0.5).hex(), // Background color of the remove button
        color: '#ffffff',
        '&:hover': {
          backgroundColor: chroma(color).darken(1).hex(),
          color: '#ffffff'
        }
      }
    },
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
        className="basic-multi-select ring-0"
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