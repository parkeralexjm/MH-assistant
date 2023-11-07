import { useEffect, useState } from "react"
import { defenceData } from "../data/data"
import { elementIcons, characterIcons, armorIcons, weaponIcons, setIcons } from '../lib/iconImports'


function Character({ characterEquip }) {
  // Initialise characterStats as blanks
  const [characterStats, setCharacterStats] = useState({
    attack: 0,
    element: '',
    eleDmg: 0,
    defence: 0,
    skills: [],
    affinity: 0
  })

  let calcEleDmg = 0
  let calcEle

  useEffect(() => {
    // If characterEquip has been set correctly
    if (characterEquip.head) {
      const currentWeapon = characterEquip.weapon.stats[characterEquip.weapon.grade - characterEquip.weapon.stats[0].startGrade]
      // Set the skills to allow calculations to work
      const newSkills = []
      // Gear check
      Object.keys(characterEquip).forEach(key => {
        // If the stats are loaded, its not a weapon, its not equal to none and the grade selected is higher than the requirement
        if (characterEquip[key].stats &&
          characterEquip[key] !== 'weapon' &&
          characterEquip[key].stats["skill1"] !== "None" &&
          characterEquip[key].grade >= parseInt(characterEquip[key].stats["skill1Grade"])
        ) {
          // Check if an upgrade exists with the same name
          if (characterEquip[key].stats["skill1"] === characterEquip[key].stats["skillUpgrade"] && characterEquip[key].grade >= parseInt(characterEquip[key].stats["skillUpgradeGrade"])) {
            const exists = newSkills.filter((element) => {
              return element.name === characterEquip[key].stats["skillUpgrade"]
            }).length > 0
            // If the skill is not in the array then push it
            if (!exists) {
              newSkills.push({ "name": characterEquip[key].stats["skillUpgrade"], "level": parseInt(characterEquip[key].stats["skillUpgradeLevel"]) })
            } else {
              // If the skill is in the array then increase it by the skill level
              const itemToIncrease = newSkills.find((element) => element.name === characterEquip[key].stats["skillUpgrade"])
              if (itemToIncrease.level + parseInt(characterEquip[key].stats["skillUpgradeLevel"]) > 5) {
                itemToIncrease.level = 5
              }
              else { itemToIncrease.level += parseInt(characterEquip[key].stats["skillUpgradeLevel"]) }
            }
          } else {
            // Filter to find if the skill exists in the array
            const exists = newSkills.filter((element) => {
              return element.name === characterEquip[key].stats["skill1"]
            }).length > 0
            // If the skill is not in the array then push it
            if (!exists) {
              newSkills.push({ "name": characterEquip[key].stats["skill1"], "level": parseInt(characterEquip[key].stats["skill1Level"]) })
            } else {
              // If the skill is in the array then increase it by the skill level
              const itemToIncrease = newSkills.find((element) => element.name === characterEquip[key].stats["skill1"])
              if (itemToIncrease.level + parseInt(characterEquip[key].stats["skill1Level"]) > 5) {
                itemToIncrease.level = 5
              } else {
                itemToIncrease.level += parseInt(characterEquip[key].stats["skill1Level"])
              }
            }
          }
        }
        // If the stats are loaded, its skill2, its not equal to none and the grade selected is higher than the requirement
        if (characterEquip[key].stats &&
          characterEquip[key].stats["skill2"] !== "None" &&
          characterEquip[key].grade >= parseInt(characterEquip[key].stats["skill2Grade"])
        ) {
          // Check if an upgrade exists with the same name
          if (characterEquip[key].stats["skill2"] === characterEquip[key].stats["skillUpgrade"] && characterEquip[key].grade >= parseInt(characterEquip[key].stats["skillUpgradeGrade"])) {
            const exists = newSkills.filter((element) => {
              return element.name === characterEquip[key].stats["skillUpgrade"]
            }).length > 0
            // If the skill is not in the array then push it
            if (!exists) {
              newSkills.push({ "name": characterEquip[key].stats["skillUpgrade"], "level": parseInt(characterEquip[key].stats["skillUpgradeLevel"]) })
            } else {
              // If the skill is in the array then increase it by the skill level
              const itemToIncrease = newSkills.find((element) => element.name === characterEquip[key].stats["skillUpgrade"])
              if (itemToIncrease.level + parseInt(characterEquip[key].stats["skillUpgradeLevel"]) > 5) {
                itemToIncrease.level = 5
              }
              else { itemToIncrease.level += parseInt(characterEquip[key].stats["skillUpgradeLevel"]) }
            }
          } else {
            // Filter to find if the skill exists in the array
            const exists = newSkills.filter((element) => {
              return element.name === characterEquip[key].stats["skill2"]
            }).length > 0
            // If the skill is not in the array then push it
            if (!exists) {
              newSkills.push({ "name": characterEquip[key].stats["skill2"], "level": parseInt(characterEquip[key].stats["skill2Level"]) })
            } else {
              // If the skill is in the array then increase it by the skill level
              const itemToIncrease = newSkills.find((element) => element.name === characterEquip[key].stats["skill2"])
              if (itemToIncrease.level + parseInt(characterEquip[key].stats["skill2Level"]) > 5) {
                itemToIncrease.level = 5
              } else {
                itemToIncrease.level += parseInt(characterEquip[key].stats["skill2Level"])
              }

            }
          }
        }
      })
      // Check if the weapon skill exists
      if (currentWeapon["skill1"] &&
        currentWeapon["skill1"] !== "None" &&
        characterEquip.weapon.grade >= currentWeapon["skill1Level"]
      ) {
        const exists = newSkills.filter((element) => {
          return element.name === currentWeapon["skill1"]
        }).length > 0
        // If the skill is not in the array then push it
        if (!exists) {
          newSkills.push({ "name": currentWeapon["skill1"], "level": parseInt(currentWeapon["skill1Level"]) })
        } else {
          // If the skill is in the array then increase it by the skill level
          const itemToIncrease = newSkills.find((element) => element.name === currentWeapon["skill1"])
          if (itemToIncrease.level + parseInt(currentWeapon["skill1Level"]) > 5) {
            itemToIncrease.level = 5
          } else { itemToIncrease.level += parseInt(currentWeapon["skill1Level"]) }
        }
      }

      // If no element on weapon then set element to zero
      if (currentWeapon.element === "None") {
        calcEleDmg = "None"
        calcEle = ""
      } else {
        // Set the element icon
        calcEle = currentWeapon.element
        // Get the element skill level for each of the armors then multiply that by 50
        const eleCheck = newSkills.some(obj => obj.name === `${currentWeapon.element} Attack`)
        if (eleCheck) {
          const index = newSkills.findIndex(obj => obj.name === `${currentWeapon.element} Attack`)
          // Get the ele skill level
          // Add ele skill level * 50 to weapon ele dmg
          if (parseInt(newSkills[index].level) === 1) {
            calcEleDmg = (parseInt(currentWeapon.eleDmg) + 50)
          } else if (parseInt(newSkills[index].level) === 2) {
            calcEleDmg = (parseInt(currentWeapon.eleDmg) + 100)
          } else if (parseInt(newSkills[index].level) === 3) {
            calcEleDmg = (parseInt(currentWeapon.eleDmg) + 200)
          } else if (parseInt(newSkills[index].level) === 4) {
            calcEleDmg = (parseInt(currentWeapon.eleDmg) + 350)
          } else if (parseInt(newSkills[index].level) === 5) {
            calcEleDmg = (parseInt(currentWeapon.eleDmg) + 500)
          }
        } else {
          // Set the elemental damage based only on weapon
          calcEleDmg = (
            parseInt(currentWeapon.eleDmg)
          )
        }
      }

      // Take the grade of each weapon and cross reference with the defence number data
      const defCheck = newSkills.some(obj => obj.name === "Defence Boost")
      let calcDefence = defenceData[characterEquip.head.grade] +
        defenceData[characterEquip.chest.grade] +
        defenceData[characterEquip.hands.grade] +
        defenceData[characterEquip.legs.grade] +
        defenceData[characterEquip.waist.grade]
      if (defCheck) {
        const index = newSkills.findIndex(obj => obj.name === "Defence Boost")
        calcDefence += (20 * newSkills[index].level
        )
      } else {
      }
      const atkCheck = newSkills.some(obj => obj.name === "Attack Boost")
      let calcAtk = parseInt(currentWeapon.attack)
      if (atkCheck) {
        const index = newSkills.findIndex(obj => obj.name === "Attack Boost")
        if (parseInt(newSkills[index].level) < 5) {
          calcAtk += (newSkills[index].level * 20)
        } else {
          calcAtk += 120
        }
      }

      setCharacterStats({ ...characterStats, attack: calcAtk, element: calcEle, eleDmg: calcEleDmg, defence: calcDefence, skills: newSkills, affinity: currentWeapon.affinity })
    }
  }, [characterEquip])

  // console.log(characterStats)
  return (
    <section id="character" className="bg-amber-50">
      <div className="flex flex-col py-4 layout">
        <div className="flex flex-col p-2 bg-opacity-50 rounded sm:w-1/2 bg-slate-300 character-stats">
          <div className="flex justify-between character-attack">
            <div className="flex items-center">
              <img className="w-4 h-4 md:h-6 md:w-6" src={characterIcons.attack} alt="Attack" />
              <h3>Attack</h3>
            </div>
            <h3>{characterStats.attack}</h3>
          </div>
          <div className="flex justify-between character-element">
            <div className="flex items-center">
              <img className="w-4 h-4 md:h-6 md:w-6" src={characterIcons.attack} alt="Attack" />
              <h3>Element</h3>
            </div>
            <div className="flex items-center">
              <img className="w-6 md:w-8" src={`${elementIcons[characterStats.element.toLowerCase()]}`} alt={characterStats.element} />
              <h3>{characterStats.eleDmg}</h3>
            </div>
          </div>
          <div className="flex justify-between character-defence">
            <div className="flex items-center">
              <img className="w-4 h-4 md:h-6 md:w-6" src={characterIcons.defence} alt="Attack" />
              <h3>Defence</h3>
            </div>
            <h3>{characterStats.defence}</h3>
          </div>
          <div className="flex justify-between character-affinity">
            <div className="flex items-center">
              <img className="w-4 h-4 md:h-6 md:w-6" src={characterIcons.affinity} alt="Attack" />
              <h3>Affinity</h3>
            </div>
            <h3>{characterStats.affinity}</h3>
          </div>
          <div className="h-24 overflow-auto character-skills">


            {
              characterStats.skills.map((skill, index) => {
                return (<div key={index} className="flex justify-between ">
                  <div className="flex items-center">
                    <img className="w-4 h-4 md:h-6 md:w-6" src={characterIcons.armor} alt="Attack" />
                    <h3>{skill.name}</h3>
                  </div>
                  <h3>Lv. {skill.level}</h3>
                </div>)
              })
            }
          </div>
        </div>
      </div>
    </section>
  )
}

export default Character