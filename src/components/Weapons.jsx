import React from 'react'

function Weapons({ selectedOptions, weaponData, characterEquip, setCharacterEquip }) {

  const handleWeaponChange = (weaponSet) => {
    setCharacterEquip({ ...characterEquip, "weapon": { "stats": weaponSet, "grade": weaponSet[0].startGrade } })
  }

  const WeaponSetDisplay = ({ weaponSet }) => {
    return (
      <div >
        <h5 className={'border rounded m-1 p-1'} onClick={() => handleWeaponChange(weaponSet)}>{weaponSet[0].name}</h5>
      </div>
    )
  }

  return (
    <>
      {
        weaponData.map((weaponType, index) => {
          return (
            <div key={index} className="weapon-type">
              <h5>{Object.keys(weaponType)[0].toUpperCase()}</h5>
              <div className="flex flex-wrap">
                {
                  Object.values(weaponType).map((weapons) => {
                    return (
                      Object.values(weapons).map((weaponSet, index) => {
                        let found = false
                        if (selectedOptions) {
                          found = selectedOptions.some(el => el.label === `${weaponSet[0].element} Attack`)
                        }
                        if (selectedOptions.length === 0) {
                          return (
                            <WeaponSetDisplay key={index} weaponSet={weaponSet} />
                          )
                        } else if (found) {
                          return (
                            <WeaponSetDisplay key={index} weaponSet={weaponSet} />
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