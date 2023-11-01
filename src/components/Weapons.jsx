import { weaponData } from "../data/data";

import React from 'react'

function Weapons() {
  const { swordAndShield, greatSword, hammer, longSword, bowGun, bow } = weaponData

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
                        return (
                          <div key={index} className="border border-red-400">
                            <h5>{singleWeapon[0]["weaponName"]}</h5>
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