import { armorData } from "../data/data";

import React from 'react'

function Armor({ characterEquip, setCharacterEquip }) {

  const handleGearChange = (item) => {
    console.log(item.slot)
    // setCharacterEquip({ ...characterEquip, item.slot : item })
  }

  return (
    <>
      {
        armorData.map((set, index) => {
          return (
            <div key={index} className="set">
              {/* This is setting the name of the set and the styling */}
              <h5>{Object.keys(set)[0].toUpperCase()}</h5>
              <div className="flex">
                {
                  Object.values(set)[0].map((item, index) => {
                    // console.log(item)
                    return (
                      // This is the key part for displaying info about the item
                      <div key={index} className="flex flex-col" onClick={() => handleGearChange(item)}>
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