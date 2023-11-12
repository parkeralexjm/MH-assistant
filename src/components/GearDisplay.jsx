import React, { useState } from 'react'
import { armorData, weaponData, skillData } from '../data/data'
import makeAnimated from 'react-select/animated'
import Armor from './Armor'
import Weapons from './Weapons'
import Select from 'react-select'
import chroma from 'chroma-js'
import determineTextColor from '../lib/colors'

function GearDisplay({ characterEquip, setCharacterEquip }) {
  const [displayType, setDisplayType] = useState('weapon')
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
        paddingLeft: 5,
      }
    },
    input: (styles) => {
      return {
        ...styles,
        paddingLeft: 5,
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

  const TypeButton = ({ children, type }) => {
    return (
      <button className={`${displayType == type ? 'text-gray-500 bg-white' : 'text-gray-800'}  my-1 py-2 font-semibold border w-full`} onClick={() => setDisplayType(type)}>{children}</button>
    )
  }

  return (
    <div className='min-h-full pt-2 shadow-inner bg-amber-50'>
      <div className='layout'>
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
        <div className='flex justify-around px-1 my-2 border'>
          <TypeButton type='weapon'>Weapon</TypeButton>
          <TypeButton type='armor'>Armor</TypeButton>
        </div>
        {displayType === 'weapon'
          ?
          <div className=''>
            <Weapons selectedOptions={selectedOptions} weaponData={weaponData} characterEquip={characterEquip} setCharacterEquip={setCharacterEquip} />
          </div>
          :
          <div className=''>
            <Armor selectedOptions={selectedOptions} armorData={armorData} characterEquip={characterEquip} setCharacterEquip={setCharacterEquip} />
          </div>
        }
      </div>
    </div>
  )
}

export default GearDisplay