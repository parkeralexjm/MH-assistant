import React from 'react'
import { gradeColors } from '../data/data'
import { weaponIcons, elementIcons } from '../lib/iconImports'

function Weapons({ selectedOptions, weaponData, characterEquip, setCharacterEquip }) {

  const handleWeaponChange = (weaponSet, set) => {
    setCharacterEquip({ ...characterEquip, "weapon": { "stats": weaponSet, "grade": weaponSet[0].startGrade, "set": set } })
  }

  const WeaponSetDisplay = ({ weaponSet, set }) => {
    let skillLevelStart
    let skillLevelUpgrade
    if (weaponSet[0].startGrade === 5 && weaponSet[0].skill1 === 'None') {
      skillLevelStart = 3
      skillLevelUpgrade = null
    } else if (weaponSet[0].startGrade === 5) {
      skillLevelStart = 0
      skillLevelUpgrade = 3
    } else if (weaponSet[0].startGrade === 4 && weaponSet[0].skill1 === 'None') {
      skillLevelStart = 4
      skillLevelUpgrade = null
    } else if (weaponSet[0].startGrade === 4) {
      skillLevelStart = 0
      skillLevelUpgrade = 4
    } else if (weaponSet[0].startGrade === 3 && weaponSet[1].skill1 === 'None') {
      skillLevelStart = 5
      skillLevelUpgrade = null
    } else if (weaponSet[0].startGrade === 3) {
      skillLevelStart = 1
      skillLevelUpgrade = 5
    } else if (weaponSet[0].startGrade === 2) {
      skillLevelStart = 6
      skillLevelUpgrade = null
    } else if (weaponSet[0].startGrade === 1 && weaponSet[5].skill1 === 'None') {
      skillLevelStart = 7
      skillLevelUpgrade = null
    } else if (weaponSet[0].startGrade === 1) {
      skillLevelStart = 3
      skillLevelUpgrade = 7
    }

    return (
      <div className={`shadow-md box-border relative flex flex-col m-1 border-2 rounded cursor-pointer ${characterEquip.weapon.stats[0].name === weaponSet[0].name && 'border-amber-500'}`} onClick={() => handleWeaponChange(weaponSet, set)}>
        <img className='brightness-0 filter opacity-5 md:p-4' src={weaponIcons[set]} alt={set} />
        <div className='absolute w-full'>
          <h5 className='m-1 overflow-hidden truncate text-ellipsis'>{weaponSet[0].name}</h5>
        </div>
        {weaponSet[0].element !== 'None' && <img src={elementIcons[weaponSet[0].element.toLowerCase()]} alt={weaponSet[0].element} className='absolute w-[20%] bottom-[50%] right-2'></img>}
        {
          <div className='absolute bottom-0 w-full p-1'>
            {
              <>
                <p className='text-sm'>
                  <span className={`font-semibold ${gradeColors.text[weaponSet[skillLevelStart].forgeGrade - 1]}`}>G{weaponSet[skillLevelStart].forgeGrade}</span> Lv.{weaponSet[skillLevelStart].skill1Level}
                </p>
                <p className='text-sm'>
                  {skillLevelUpgrade && <><span className={`font-semibold ${gradeColors.text[weaponSet[skillLevelUpgrade].forgeGrade - 1]}`}>G{weaponSet[skillLevelUpgrade].forgeGrade}</span><span> Lv.{weaponSet[skillLevelUpgrade].skill1Level}</span></>}
                </p>
              </>
            }
            {<p className='overflow-hidden text-sm font-semibold truncate text-ellipsis'>{weaponSet[skillLevelStart].skill1}</p>}
          </div>
        }
      </div>
    )
  }

  return (
    <>
      {
        weaponData.map((weaponType, index) => {
          return (
            <div key={index} className="weapon-type">
              <div className="flex flex-wrap w-full">
                {
                  Object.values(weaponType).map((weapons) => {
                    return (
                      Object.values(weapons).map((weaponSet, index) => {
                        let found = false
                        if (selectedOptions) {
                          found = selectedOptions.some(el => el.label === `${weaponSet[0].element} Attack` || el.label === `${weaponSet[weaponSet.length - 1].skill1}`)
                        }
                        if (selectedOptions.length === 0) {
                          return (
                            <div key={index} className='w-1/3 sm:w-1/4 md:w-1/6 lg:1/10'>
                              <WeaponSetDisplay key={index} weaponSet={weaponSet} set={Object.keys(weaponType)[0].replace(/\s+/g, '').toLowerCase()} />
                            </div>
                          )
                        } else if (found) {
                          return (
                            <div key={index} className='w-1/3 sm:w-1/4 md:w-1/6 lg:1/10'>
                              <WeaponSetDisplay key={index} weaponSet={weaponSet} set={Object.keys(weaponType)[0].replace(/\s+/g, '').toLowerCase()} />
                            </div>
                          )
                        }
                      })
                    )
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

export default Weapons