const shortenSkill = (skill) => {
  const skillName = skill.split(' ')
  if (skillName.length >= 2) {
    skillName[1] = skillName[1].slice(0, 1) + '.'
  }
  const reducedSkill = skillName.join(' ')
  return reducedSkill
}

export default shortenSkill