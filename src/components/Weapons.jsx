import React from 'react'

function Weapons({ weaponData, characterEquip, setCharacterEquip }) {

  const handleWeaponChange = (weaponSet) => {
    setCharacterEquip({ ...characterEquip, "weapon": { "stats": weaponSet, "grade": weaponSet[0].startGrade } })
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
                    // console.log(weapons)
                    return (
                      Object.values(weapons).map((weaponSet, index) => {
                        return (
                          <div key={index} >
                            <h5 className={'border rounded m-1 p-1'} onClick={() => handleWeaponChange(weaponSet)}>{weaponSet[0].name}</h5>
                          </div>
                        )
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