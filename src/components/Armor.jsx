import React from 'react'
import { gradeColors } from '../data/data'
import { armorIcons, setIcons } from '../lib/iconImports'

function Armor({ selectedOptions, armorData, characterEquip, setCharacterEquip }) {
  const handleArmorChange = (item, set) => {
    let checkedGrade
    // Get the current grade of the item
    const currentGrade = characterEquip[item.slot].grade
    // Check if that exists on the new item
    currentGrade > item.startGrade ? checkedGrade = currentGrade : checkedGrade = item.startGrade

    const { slot } = item
    setCharacterEquip({ ...characterEquip, [slot.toLowerCase()]: { "stats": item, "grade": item.startGrade, "set": set } })
  }

  const ArmorDisplay = ({ item, index, selected, set }) => {
    return (
      <div key={index} className={`flex flex-col border cursor-pointer ${selected && "border-green-500"}`} value={0} onClick={() => handleArmorChange(item, set)}>
        {
          <>
            <h5 className='font-bold'>{item.name}</h5>
            {
              item.skill1 &&
              <h5>
                {item.skill1} {item.skill1Level}{item.skillUpgradeGrade !== 0 && item.skillUpgrade === item.skill1 && <span>/{item.skillUpgradeLevel}</span>} -
                <span className={`font-semibold ${gradeColors[item.skill1Grade === 0 ? item.startGrade - 1 : item.skill1Grade - 1]}`}> G{item.skill1Grade === 0 ? item.startGrade : item.skill1Grade}</span>
                {item.skillUpgradeGrade !== 0 && item.skillUpgrade === item.skill1 &&
                  <>
                    <span>/</span>
                    <span className={`font-semibold ${gradeColors[item.skillUpgradeGrade - 1]}`}>G{item.skillUpgradeGrade}</span>
                  </>
                }
              </h5>
            }
            {
              item.skill2 !== "None" &&
              <h5>
                {item.skill2} {item.skill2Level} -
                <span className={`font-semibold ${gradeColors[item.skill2Grade === 0 ? item.startGrade - 1 : item.skill2Grade - 1]}`}> G{item.skill2Grade === 0 ? item.startGrade : item.skill2Grade}</span>
                {item.skillUpgradeGrade !== 0 &&
                  item.skillUpgrade === item.skill2 &&
                  <>
                    <span>/</span>
                    <span className={`font-semibold ${gradeColors[item.skillUpgradeGrade - 1]}`}>G{item.skillUpgradeGrade}</span>
                  </>
                }
              </h5>
            }
          </>
        }
      </div>
    )
  }

  return (
    <>
      {
        characterEquip.head &&
        armorData.map((set, index) => {
          return (
            <div key={index} className="set">
              {/* This is setting the name of the set and the styling */}
              <div className="flex w-full">
                {
                  Object.values(set)[0].map((item, index) => {
                    let selected = false
                    let found = false
                    if (
                      item === characterEquip.head.stats ||
                      item === characterEquip.chest.stats ||
                      item === characterEquip.hands.stats ||
                      item === characterEquip.waist.stats ||
                      item === characterEquip.legs.stats
                    ) {
                      selected = true
                    }
                    if (selectedOptions) {
                      found = selectedOptions.some(el => el.label === item.skill1 || el.label === item.skill2)
                    }
                    if (selectedOptions.length === 0) {
                      return (
                        <div className='w-1/5' key={index}>
                          <ArmorDisplay item={item} index={index} selected={selected} set={Object.keys(set)[0]} />
                        </div>
                      )
                    } else if (found) {
                      return (
                        <div className='w-1/5' key={index}>
                          {
                            found &&
                            <ArmorDisplay item={item} index={index} selected={selected} set={Object.keys(set)[0]} />
                          }
                        </div>
                      )
                    } else {
                      return (
                        <div className='w-1/5'></div>
                      )
                    }
                  })
                }
              </div>
            </div>
          )
        })
      }
    </>
  )
}

export default Armor