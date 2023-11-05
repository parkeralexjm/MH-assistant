import React from 'react'
import { gradeColors } from '../data/data'

function Armor({ selectedOptions, armorData, characterEquip, setCharacterEquip }) {
  const handleArmorChange = (item) => {
    let checkedGrade
    // Get the current grade of the item
    const currentGrade = characterEquip[item.slot].grade
    // Check if that exists on the new item
    currentGrade > item.startGrade ? checkedGrade = currentGrade : checkedGrade = item.startGrade

    const { slot } = item
    setCharacterEquip({ ...characterEquip, [slot.toLowerCase()]: { "stats": item, "grade": item.startGrade } })
  }

  const ArmorDisplay = ({ item, index, selected }) => {
    return (
      <div key={index} className={`flex flex-col border cursor-pointer ${selected && "border-green-500"}`} value={0} onClick={() => handleArmorChange(item)}>
        {
          <>
            <h5 className='font-bold'>{item.name}</h5>
            {
              item.skill1 &&
              <h5>
                {item.skill1} -
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
                {item.skill2} -
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
              <h5>{Object.keys(set)[0].toUpperCase()}</h5>
              <div className="flex">
                {
                  Object.values(set)[0].map((item, index) => {
                    // console.log(item)
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
                        <ArmorDisplay item={item} index={index} selected={selected} />
                      )
                    } else if (found) {
                      return (
                        <div key={index}>
                          {
                            found &&
                            <ArmorDisplay item={item} index={index} selected={selected} />
                          }
                        </div>
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