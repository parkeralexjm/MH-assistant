import React from 'react'

function Weapons({ weaponData, characterEquip, setCharacterEquip }) {

  const handleWeaponChange = (singleWeapon) => {
    setCharacterEquip({ ...characterEquip, "weapon": { "stats": singleWeapon } })
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
                      Object.values(weapons).map((singleWeapon, index) => {
                        let selected = false
                        if (singleWeapon[0] === characterEquip.weapon.stats) {
                          selected = true
                        }
                        return (
                          <div key={index} className={`flex flex-col border ${selected ? "border-green-400" : "border-red-400"}`} onClick={() => handleWeaponChange(singleWeapon[0])}>
                            <h5>{singleWeapon[0]["name"]}</h5>
                          </div>)
                      })
                    )
                  })}
              </div>
            </div>
          )


        })
      }
    </>
  )
}

export default Weapons