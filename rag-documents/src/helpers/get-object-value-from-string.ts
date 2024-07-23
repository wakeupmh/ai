export const getObjectValueFromString = (object: any, path: string): any => {
  const parts = path.split('.')
  let value = object

  for (const part of parts) {
    if (value[part] === undefined) {
      return undefined
    }
    value = value[part]
  }
  return value
}
