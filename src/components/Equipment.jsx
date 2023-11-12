import React from "react"
import Select from "react-select"
import { gradeColors, weaponData, armorData, colorRef, defaultSets } from "../data/data"
import determineTextColor from "../lib/colors"
import chroma from "chroma-js"
import { setIcons, weaponIcons, armorIcons } from "../lib/iconImports"
import down from '../assets/down.png'

function Equipment({ characterEquip, setCharacterEquip }) {

  const handleGrade = (e, equipment) => {
    if (equipment.stats.slot) {
      setCharacterEquip({ ...characterEquip, [equipment.stats.slot.toLowerCase()]: { "stats": equipment.stats, "grade": e.value, "set": equipment.set } })
    } else {
      setCharacterEquip({ ...characterEquip, "weapon": { "stats": equipment.stats, "grade": e.value, "set": equipment.set } })
    }
  }
  const handleReset = () => {
    setCharacterEquip(defaultSets)
  }

  const handleSave = (type) => {
    localStorage.setItem(type, JSON.stringify(characterEquip))
  }

  const handleLoad = (type) => {
    if (localStorage.getItem(type)) {
      const savedEquipment = JSON.parse(localStorage.getItem(type))
      setCharacterEquip(savedEquipment)
    }
  }

  const colorStyles = {
    control: (styles, state) => {
      return {
        ...styles,
        backgroundColor: 'transparent',
        border: 'none',
        width: '75px',
        minHeight: '40px',
        // padding: '0 !important',
        cursor: 'pointer',
        boxShadow: 'none', // This removes tailwind box-shadow ring
        position: 'relative'
      }
    },
    valueContainer: (styles, state) => {
      return {
        ...styles,
        position: 'absolute',
        bottom: 0,
        padding: 0,
        width: '50px'
      }
    },
    option: (styles, state) => {
      const color = state.data.color
      return {
        ...styles,
        color: color,
        cursor: 'pointer',
        width: '50px',
        backgroundColor: state.isSelected ? chroma(color).alpha(0.25).hex() : 'white',
        transition: 'background-color 0.2s', // Add a smooth transition for the background color change
        '&:hover': {
          backgroundColor: chroma(color).alpha(0.1).hex(), // Background color on hover
          color: color, // Text color on hover
        },
      }
    },
    singleValue: (styles, state) => {
      return {
        ...styles,
        color: state.data.color
      }
    },
    indicatorsContainer: (styles) => {
      return {
        ...styles,
        display: 'none'
      }
    },
    menu: (styles) => {
      return {
        ...styles,
        marginTop: 0,
        width: '50px'
      }
    }
  }

  const createOptions = (start = 1) => {
    const options = []
    for (let i = start; i <= 10; i++) {
      options.push({ label: `G${i}`, value: i, color: colorRef[i - 1] })
    }

    return options
  }

  return (
    <section id="equipment" className="flex justify-center w-1/2 xs:w-1/2 md:w-full ">
      <div className="flex flex-col md:layout">
        <div className="flex flex-col items-center bg-opacity-50 character-equipment bg-slate-50">
          <div className="flex flex-wrap p-2 md:flex-row md:flex-nowrap">
            {characterEquip.weapon ?
              Object.values(characterEquip).map((equipment, index) => {
                return (
                  <div key={index} className={`md:w-1/6 w-1/2 flex justify-center`}>
                    <div className={`relative border-2 rounded m-0.5 sm:m-1 ${gradeColors.border[equipment.grade - 1]}`}>
                      {
                        equipment.stats.name ?
                          <img className="brightness-0 filter opacity-5 md:p-4" src={armorIcons[equipment.stats.slot]} alt={equipment.stats.slot} /> :
                          <img className="brightness-0 filter opacity-5 md:p-4" src={weaponIcons[equipment.set]} alt={equipment.set} />
                      }
                      <div className="absolute flex flex-col justify-between w-full h-full top-1">
                        {
                          equipment.stats.name ?
                            <p className="px-2 overflow-hidden font-semibold text-ellipsis">{equipment.stats.name}</p>
                            :
                            // Deals with weapon changing name after a certain grade
                            <p className="px-2 overflow-hidden font-semibold text-ellipsis">{equipment.stats[(equipment.grade - equipment.stats[0].startGrade)].name}</p>
                        }
                        <Select
                          onChange={(e) => handleGrade(e, equipment)}
                          value={{ 'value': equipment.grade, label: `G${equipment.grade}`, color: colorRef[equipment.grade - 1] }}
                          name="grade"
                          isSearchable={false}
                          styles={colorStyles}
                          className="w-[45px] absolute bottom-2 font-semibold pl-2"
                          maxMenuHeight={410}
                          options={
                            createOptions(equipment.stats.startGrade ? equipment.stats.startGrade : equipment.stats[0].startGrade)
                          }
                        />
                      </div>
                    </div>

                  </div>
                )
              })
              :
              <h1>Loading...</h1>
            }
          </div>
          <div className="flex flex-col w-full px-2 pb-2 md:p-0 md:flex-row md:justify-around md:pb-2">
            <div className="w-full h-10 py-1 md:w-48">
              <button className="w-full h-full px-2 py-1 text-white bg-gray-600 rounded shadow-lg" onClick={handleReset}>Reset Equipment</button>
            </div>
            <div className="flex items-center w-full h-10 py-1 md:w-48">
              <button className="w-5/6 h-full px-2 py-1 text-xs text-white bg-green-700 border-r shadow-lg md:text-base rounded-s border-r-green-600" onClick={() => handleSave('default_character_equip')}>Save Default Set</button>
              <button className="relative flex items-center justify-center w-1/6 h-full mx-auto text-white transition-colors bg-green-700 rounded-e dropdown-btn hover:bg-green-400">
                <img src={down} alt="chevron" className="w-5 filter invert" />
                <div className="absolute top-full right-0 flex-col w-[150px] dropdown z-10 hidden">
                  <a className="p-1 text-xs transition-colors bg-green-700 md:text-base border-y hover:bg-green-400 border-y-green-600" onClick={() => handleSave('gearset1_character_equip')}>Save Gearset 1</a>
                  <a className="p-1 text-xs transition-colors bg-green-700 border-b md:text-base hover:bg-green-400 border-b-green-600" onClick={() => handleSave('gearset2_character_equip')}>Save Gearset 2</a>
                  <a className="p-1 text-xs transition-colors bg-green-700 border-b md:text-base hover:bg-green-400 border-b-green-600" onClick={() => handleSave('gearset3_character_equip')}>Save Gearset 3</a>
                  <a className="p-1 text-xs transition-colors bg-green-700 rounded-b md:text-base hover:bg-green-400" onClick={() => handleSave('gearset4_character_equip')}>Save Gearset 4</a>
                </div>
              </button>
            </div>
            <div className="flex items-center w-full h-10 py-1 md:w-48">
              <button className="w-5/6 h-full px-2 py-1 text-xs text-white bg-purple-700 border-r shadow-lg md:text-base rounded-s border-r-purple-500" onClick={() => handleLoad("default_character_equip")}>Load Default Set</button>
              <button className="relative flex items-center justify-center w-1/6 h-full text-white transition-colors bg-purple-700 hover:bg-purple-400 rounded-e dropdown-btn">
                <img src={down} alt="chevron" className="w-5 filter invert" />
                <div className="absolute top-full right-0 flex-col w-[150px] dropdown z-10 hidden shadow-2xl">
                  <a className="p-1 text-xs transition-colors bg-purple-700 md:text-base border-y hover:bg-purple-400 border-y-purple-500" onClick={() => handleLoad("gearset1_character_equip")}>Load Gearset 1</a>
                  <a className="p-1 text-xs transition-colors bg-purple-700 border-b md:text-base hover:bg-purple-400 border-b-purple-500" onClick={() => handleLoad("gearset2_character_equip")}>Load Gearset 2</a>
                  <a className="p-1 text-xs transition-colors bg-purple-700 border-b md:text-base hover:bg-purple-400 border-b-purple-500" onClick={() => handleLoad("gearset3_character_equip")}>Load Gearset 3</a>
                  <a className="p-1 text-xs transition-colors bg-purple-700 rounded-b md:text-base hover:bg-purple-400" onClick={() => handleLoad("gearset4_character_equip")}>Load Gearset 4</a>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Equipment