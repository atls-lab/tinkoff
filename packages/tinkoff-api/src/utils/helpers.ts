export const sortAlphabetically = (a: string, b: string) => a.localeCompare(b)

export const excludeKeys = (base: any, excludeCandidateKeys: string[]) => {
  return Object.entries(base).reduce((result, [key, value]) => {
    if (excludeCandidateKeys.includes(key)) {
      return { ...result }
    }
    return { ...result, [key]: value }
  }, {})
}

export const apply = (target: any, applyer: any) => {
  return Object.entries(applyer).reduce((result, [key, value]) => ({ ...result, [key]: value }), {})
}
