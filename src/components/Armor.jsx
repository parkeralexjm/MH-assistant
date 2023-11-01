import { armorData } from "../data/data";

import React from 'react'

function Armor({ characterEquip, setCharacterEquip }) {
  const handleArmorChange = (item, grade) => {
    const { slot } = item
    setCharacterEquip({ ...characterEquip, [slot.toLowerCase()]: { "stats": item, "grade": grade } })
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
                    let selected = false
                    if (
                      item === characterEquip.head.stats ||
                      item === characterEquip.chest.stats ||
                      item === characterEquip.hands.stats ||
                      item === characterEquip.waist.stats ||
                      item === characterEquip.legs.stats
                    ) {
                      selected = true
                      console.log(item)
                    }
                    return (
                      // This is the key part for displaying info about the item
                      <div key={index} className={`flex flex-col ${selected && "border border-green-500"}`} onClick={() => handleArmorChange(item, 0)}>
                        <h5>{item.name}</h5>
                        {
                          item.skill1 && <h5>{item.skill1}</h5>
                        }
                        {
                          item.skill2 !== "None" && <h5>{item.skill2}</h5>
                        }
                      </div>
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

export default Armor