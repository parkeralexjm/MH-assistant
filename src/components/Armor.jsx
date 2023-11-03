import React from 'react'

function Armor({ armorData, characterEquip, setCharacterEquip }) {
  const handleArmorChange = (item) => {
    let checkedGrade
    // Get the current grade of the item
    const currentGrade = characterEquip[item.slot].grade
    // Check if that exists on the new item
    currentGrade > item.startGrade ? checkedGrade = currentGrade : checkedGrade = item.startGrade

    const { slot } = item
    setCharacterEquip({ ...characterEquip, [slot.toLowerCase()]: { "stats": item, "grade": item.startGrade } })
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
                    if (
                      item === characterEquip.head.stats ||
                      item === characterEquip.chest.stats ||
                      item === characterEquip.hands.stats ||
                      item === characterEquip.waist.stats ||
                      item === characterEquip.legs.stats
                    ) {
                      selected = true
                    }
                    let id = item.name.toLowerCase().split(' ').join('-')
                    return (
                      // This is the key part for displaying info about the item
                      <div key={index} className={`flex flex-col border cursor-pointer ${selected && "border-green-500"}`} value={0} onClick={() => handleArmorChange(item)}>
                        <h5>{item.name}</h5>
                        {
                          item.skill1 && <h5>{item.skill1} - G{item.skill1Grade === 0 ? item.startGrade : item.skill1Grade}</h5>
                        }
                        {
                          item.skill2 !== "None" && <h5>{item.skill2} - G{item.skill2Grade === 0 ? item.startGrade : item.skill2Grade}</h5>
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