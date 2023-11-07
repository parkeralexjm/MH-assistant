import React from "react"
import Select from "react-select"
import { weaponData, armorData } from "../data/data"
import determineTextColor from "../lib/colors"
import chroma from "chroma-js"
import { setIcons, weaponIcons, armorIcons } from "../lib/iconImports"

function Equipment({ characterEquip, setCharacterEquip }) {

  const handleGrade = (e, equipment) => {
    console.log(equipment)
    if (equipment.stats.slot) {
      setCharacterEquip({ ...characterEquip, [equipment.stats.slot.toLowerCase()]: { "stats": equipment.stats, "grade": e.value, "set": equipment.set } })
    } else {
      setCharacterEquip({ ...characterEquip, "weapon": { "stats": equipment.stats, "grade": e.value, "set": equipment.set } })
    }
  }
  const handleReset = () => {
    setCharacterEquip({
      "weapon": { "stats": weaponData[0]["Sword And Shield"].jagrasedge, "grade": weaponData[0]["Sword And Shield"].jagrasedge[0].startGrade, "set": "swordandshield" },
      "head": { "stats": armorData[0].leather[0], "grade": armorData[0].leather[0].startGrade, "set": "leather" },
      "chest": { "stats": armorData[0].leather[1], "grade": armorData[0].leather[1].startGrade, "set": "leather" },
      "hands": { "stats": armorData[0].leather[2], "grade": armorData[0].leather[2].startGrade, "set": "leather" },
      "waist": { "stats": armorData[0].leather[3], "grade": armorData[0].leather[3].startGrade, "set": "leather" },
      "legs": { "stats": armorData[0].leather[4], "grade": armorData[0].leather[4].startGrade, "set": "leather" }
    })
  }

  const colorRef = [
    '#93a3b8', // Grey 0
    '#4ade80', // Green 1
    '#38bdf8', // Blue 2
    '#a855f7', // Violet 3
    '#fbbf24', // Amber 4
    '#f97316', // Orange 5
    '#ef4444', // Red 6
    '#ef4444', // Red 7
    '#ef4444', // Red 8
    '#ef4444'  // Red 9
  ]

  const colorStyles = {
    control: (styles, state) => {
      return {
        ...styles,
        backgroundColor: 'transparent',
        border: 'none',
        width: '50px',
        minHeight: '10px',
        padding: '0 !important',
        cursor: 'pointer',
        boxShadow: 'none', // This removes tailwind box-shadow ring
        // position: 'absolute'
      }
    },
    valuecontainer2: (styles, state) => {
      return {
        ...styles,
        padding: '0 !important',
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
        marginTop: 0
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
    <section id="equipment" className="flex justify-center w-full bg-slate-50">
      <div className="flex flex-col bg-opacity-50 layout ">
        <button className="w-24 text-white bg-gray-600 border border-black rounded" onClick={handleReset}>Reset</button>
        <div className="character-equipment">
          <div className="flex">
            {characterEquip.weapon ?
              Object.values(characterEquip).map((equipment, index) => {
                console.log(equipment)
                return (
                  <div key={index} className='relative w-1/6 p-1'>
                    <div className={`flex flex-col justify-between relative`}>
                      {
                        equipment.stats.name ?
                          <img className="brightness-0 filter opacity-5 md:p-4" src={armorIcons[equipment.stats.slot]} alt={equipment.stats.slot} /> :
                          <img className="brightness-0 filter opacity-5" src={weaponIcons[equipment.set]} alt={equipment.set} />
                      }
                      {
                        equipment.stats.name ?
                          <div className="absolute flex w-full">
                            <p className="overflow-hidden text-ellipsis">{equipment.stats.name}</p>
                          </div>
                          :
                          // Deals with weapon changing name after a certain grade
                          <div className="absolute flex w-full">
                            <p className="overflow-hidden text-ellipsis">{equipment.stats[(equipment.grade - equipment.stats[0].startGrade)].name}</p>
                          </div>
                      }
                    </div>
                    <Select
                      onChange={(e) => handleGrade(e, equipment)}
                      value={{ 'value': equipment.grade, label: `G${equipment.grade}`, color: colorRef[equipment.grade - 1] }}
                      name="grade"
                      isSearchable={false}
                      styles={colorStyles}
                      className="w-[58px] font-semibold absolute bottom-2"
                      options={
                        createOptions(equipment.stats.startGrade ? equipment.stats.startGrade : equipment.stats[0].startGrade)
                      }
                    />
                  </div>
                )
              })
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