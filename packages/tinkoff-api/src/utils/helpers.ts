export const excludeKeys = (base: any, excludeCandidateKeys: string[]) => {
  return Object.entries(base).reduce((result, [key, value]) => {
    if (excludeCandidateKeys.includes(key)) {
      return { ...result }
    }
    return { ...result, [key]: value }
  }, {})
}

export const sortAlphabetically = (a: string, b: string) => a.localeCompare(b)
