import { Fragment, useEffect, useState } from "react"
import { defenceData } from "../data/data"


function Character({ characterEquip }) {
  // Initialise characterStats as blanks
  const [characterStats, setCharacterStats] = useState({
    attack: 0,
    element: '',
    eleDmg: 0,
    defence: 0,
    skills: []
  })

  let calcAttack
  let calcEleDmg = 0
  let calcEle

  useEffect(() => {
    // console.log(characterEquip)
    // If characterEquip has been set correctly
    if (characterEquip.head) {
      // Set the skills to allow calculations to work
      const newSkills = []
      Object.keys(characterEquip).forEach(key => {
        if (characterEquip[key].stats && characterEquip[key].stats["skill1"] !== "None") {
          const exists = newSkills.filter((element) => {
            return element.name === characterEquip[key].stats["skill1"]
          }).length > 0
          // If the skill is not in the array then push it
          if (!exists) {
            newSkills.push({ "name": characterEquip[key].stats["skill1"], "level": parseInt(characterEquip[key].stats["skill1Level"]) })
          } else {
            // If the skill is in the array then increase it by the skill level
            const itemToIncrease = newSkills.find((element) => element.name === characterEquip[key].stats["skill1"])
            itemToIncrease.level += parseInt(characterEquip[key].stats["skill1Level"])
          }
        }
      })

      // If no element on weapon then set element to zero
      if (characterEquip.weapon.stats.element === "None") {
        calcEleDmg = "None"
        calcEle = ""
      } else {
        // Set the element icon
        calcEle = characterEquip.weapon.stats.element
        // Get the element skill level for each of the armors then multiply that by 50
        const eleCheck = newSkills.some(obj => obj.name === `${characterEquip.weapon.stats.element} Attack`)
        const atkCheck = newSkills
        if (eleCheck) {
          const index = newSkills.findIndex(obj => obj.name === `${characterEquip.weapon.stats.element} Attack`)
          // Get the ele skill level
          // Add ele skill level * 50 to weapon ele dmg
          if (parseInt(newSkills[index].level) === 1) {
            calcEleDmg = (parseInt(characterEquip.weapon.stats.eleDmg) + 50)
          } else if (parseInt(newSkills[index].level) === 2) {
            calcEleDmg = (parseInt(characterEquip.weapon.stats.eleDmg) + 100)
          } else if (parseInt(newSkills[index].level) === 3) {
            calcEleDmg = (parseInt(characterEquip.weapon.stats.eleDmg) + 200)
          } else if (parseInt(newSkills[index].level) === 4) {
            calcEleDmg = (parseInt(characterEquip.weapon.stats.eleDmg) + 350)
          } else if (parseInt(newSkills[index].level) === 5) {
            calcEleDmg = (parseInt(characterEquip.weapon.stats.eleDmg) + 500)
          }
        } else {
          // Set the elemental damage based only on weapon
          calcEleDmg = (
            parseInt(characterEquip.weapon.stats.eleDmg)
          )
        }
      }

      // Take the grade of each weapon and cross reference with the defence number data
      const calcDefence = (
        defenceData[characterEquip.head.grade] +
        defenceData[characterEquip.chest.grade] +
        defenceData[characterEquip.hands.grade] +
        defenceData[characterEquip.legs.grade] +
        defenceData[characterEquip.waist.grade]
      )

      setCharacterStats({ ...characterStats, attack: characterEquip.weapon.stats.attack, element: calcEle, eleDmg: calcEleDmg, defence: calcDefence, skills: newSkills })
    }
  }, [characterEquip])

  // console.log(characterStats)
  return (
    <section id="character" className="bg-amber-100">
      <div className="flex flex-col layout">
        <h1>Character</h1>
        <div className="flex flex-col w-1/2 p-2 bg-opacity-50 rounded bg-slate-300 character-stats">
          <div className="flex justify-between character-attack">
            <h3>Attack</h3>
            <h3>{characterStats.attack}</h3>
          </div>
          <div className="flex justify-between character-element">
            <h3>Element</h3>
            <div className="flex items-center">
              <h4>{characterStats.element}</h4>
              <h3>{characterStats.eleDmg}</h3>
            </div>
          </div>
          <div className="flex justify-between character-defence">
            <h3>Defence</h3>
            <h3>{characterStats.defence}</h3>
          </div>
          <div className="character-skills">
            {
              characterStats.skills.map((skill, index) => {
                return (<div key={index} className="flex justify-between ">
                  <h3>{skill.name}</h3>
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