export const sortAlphabetically = (a: string, b: string) => a.localeCompare(b)

// eslint-disable-next-line no-param-reassign
export const deletePropertyByKey = (target: any) => (key: string) => delete target[key]

export const apply = (target: any, applyer: any) => {
  Object.entries(applyer).forEach(([key, value]) => {
    // eslint-disable-next-line no-param-reassign
    target[key] = value
  })
}
