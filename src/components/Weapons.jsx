import React from 'react'
import { gradeColors } from '../data/data'
import { weaponIcons, setIcons } from '../lib/iconImports'

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
      <div className='box-border p-1 m-1 border rounded cursor-pointer' onClick={() => handleWeaponChange(weaponSet, set)}>
        <h5>{weaponSet[0].name}</h5>
        {weaponSet[0].element !== 'None' ? <h5>{weaponSet[0].element}</h5> : <h5>No Element</h5>}
        {
          <h5>
            {weaponSet[skillLevelStart].skill1} {weaponSet[skillLevelStart].skill1Level}
            {skillLevelUpgrade && <span>/{weaponSet[skillLevelUpgrade].skill1Level}</span>} -

            {<span className={`font-semibold ${gradeColors[weaponSet[skillLevelStart].forgeGrade - 1]}`}> G{weaponSet[skillLevelStart].forgeGrade}</span>}
            {skillLevelUpgrade && <span>/</span>}
            {skillLevelUpgrade && <span className={`font-semibold ${gradeColors[weaponSet[skillLevelUpgrade].forgeGrade - 1]}`}>G{weaponSet[skillLevelUpgrade].forgeGrade}</span>}
          </h5>
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
                            <div className='w-1/4 '>
                              <WeaponSetDisplay key={index} weaponSet={weaponSet} set={Object.keys(weaponType)[0].replace(/\s+/g, '').toLowerCase()} />
                            </div>
                          )
                        } else if (found) {
                          return (
                            <div className='w-1/4'>
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