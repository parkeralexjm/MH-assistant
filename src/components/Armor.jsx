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

  const SkillDisplay = ({ skillGrade, startGrade, name, level, children }) => {
    return (<div className='overflow-hidden text-ellipsis'>
      <p className={`text-sm/none font-semibold ${gradeColors.text[skillGrade === 0 ? startGrade - 1 : skillGrade - 1]}`}>G{skillGrade === 0 ? startGrade : skillGrade} <span className='float-right text-gray-800'>Lv.{level}</span></p>
      <p className={`${selectedOptions.map(option => option.label).includes(name) && 'bg-green-600 bg-opacity-20 border-l-emerald-400 border-l-2'} pb-[0.14em] overflow-hidden truncate text-sm/none text-ellipsis`}>{children}</p>
    </div>)
  }

  const ArmorDisplay = ({ item, index, selected, set }) => {
    return (
      <div key={index} className={`flex flex-col justify-center shadow-md relative border-2 cursor-pointer rounded m-1 ${selected && "border-amber-500"} h-36 md:h-auto`} value={0} onClick={() => handleArmorChange(item, set)}>
        {
          <>
            <img className='p-2 md:p-8 opacity-10' src={setIcons[set]} alt={set} />
            <div className='absolute top-0 w-full'>
              <h5 className='p-1 overflow-hidden font-bold text-ellipsis'>{item.name}</h5>
            </div>
            <div className='absolute bottom-0 w-full p-1'>
              {
                item.skill1 &&
                <SkillDisplay skillGrade={item.skill1Grade} startGrade={item.startGrade} name={item.skill1} level={item.skill1Level}>{item.skill1}</SkillDisplay>
              }
              {
                item.skill2 !== 'None' &&
                <SkillDisplay skillGrade={item.skill2Grade} startGrade={item.startGrade} name={item.skill2} level={item.skill2Level}>{item.skill2}</SkillDisplay>
              }
              {
                item.skillUpgrade !== 'None' &&
                <SkillDisplay skillGrade={item.skillUpgradeGrade} startGrade={item.startGrade} name={item.skillUpgrade} level={item.skillUpgradeLevel}>{item.skillUpgrade}</SkillDisplay>
              }
            </div>
          </>
        }
      </div>
    )
  }

  return (
    <>
      <div className='flex set-header'>
        {
          Object.values(armorIcons).map((icon, index) => {
            return (
              <div key={index} className='w-1/5'><img className='p-2 brightness-0 opacity-5 md:hidden' src={icon} alt={icon} /></div>
            )
          })
        }
      </div>
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
                      item.name === characterEquip.head.stats.name ||
                      item.name === characterEquip.chest.stats.name ||
                      item.name === characterEquip.hands.stats.name ||
                      item.name === characterEquip.waist.stats.name ||
                      item.name === characterEquip.legs.stats.name
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