import React from "react"
import Select from "react-select"
import { weaponData, armorData } from "../data/data"

function Equipment({ characterEquip, setCharacterEquip }) {

  const handleGrade = (e, equipment) => {
    if (equipment.stats.slot) {
      setCharacterEquip({ ...characterEquip, [equipment.stats.slot.toLowerCase()]: { "stats": equipment.stats, "grade": e.value } })
    } else {
      setCharacterEquip({ ...characterEquip, "weapon": { "stats": equipment.stats, "grade": e.value } })
    }
  }
  const handleReset = () => {
    setCharacterEquip({
      "weapon": { "stats": weaponData[0]["Sword And Shield"].jagrasedge, "grade": weaponData[0]["Sword And Shield"].jagrasedge[0].startGrade },
      "head": { "stats": armorData[0].leather[0], "grade": armorData[0].leather[0].startGrade },
      "chest": { "stats": armorData[0].leather[1], "grade": armorData[0].leather[1].startGrade },
      "hands": { "stats": armorData[0].leather[2], "grade": armorData[0].leather[2].startGrade },
      "waist": { "stats": armorData[0].leather[3], "grade": armorData[0].leather[3].startGrade },
      "legs": { "stats": armorData[0].leather[4], "grade": armorData[0].leather[4].startGrade }
    })
  }

  const colorRef = [
    '#93a3b8', // Grey 0
    '#4ade80', // Green 1
    '#38bdf8', // Blue 2
    '#a78bfa', // Violet 3
    '#fbbf24', // Amber 4
    '#f97316', // Orange 5
    '#ef4444', // Red 6
    '#ef4444', // Red 7
    '#ef4444', // Red 8
    '#ef4444'  // Red 9
  ]

  const colorStyles = {
    control: (styles) => {
      return { ...styles, backgroundColor: 'transparent' }
    },
    option: (styles, { data, isFocused, isDisabled, isSelected }) => {
      return { ...styles, color: data.color }
    },
    singleValue: (styles, { data }) => {
      return { ...styles, color: data.color }
    }
  }

  const createOptions = (start = 1) => {
    const options = []
    for (let i = start; i <= 10; i++) {
      options.push({ value: i, label: `G${i}`, color: colorRef[i - 1] })
    }
    return options
  }

  return (
    <section id="equipment" className="bg-opacity-50 bg-slate-300">
      <div className="flex flex-col layout">
        <h1>Gearset</h1>
        <button className="w-24 text-white bg-gray-600 border border-black rounded" onClick={handleReset}>Reset</button>
        <div className="character-equipment">
          <div className="flex justify-around">
            {characterEquip.weapon ?
              Object.values(characterEquip).map((equipment, index) => {
                return (
                  <div key={index}>
                    {
                      equipment.stats.name ?
                        <h4>{equipment.stats.name}</h4>
                        :
                        <h4>{equipment.stats[(equipment.grade - equipment.stats[0].startGrade)].name}</h4>
                    }
                    <Select
                      onChange={(e) => handleGrade(e, equipment)}
                      value={{ 'value': equipment.grade, label: `G${equipment.grade}`, color: colorRef[equipment.grade - 1] }}
                      isSearchable={false}
                      styles={colorStyles}
                      className="font-semibold"
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