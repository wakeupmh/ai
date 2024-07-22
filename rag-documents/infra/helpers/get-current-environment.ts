export const getCurrentEnvironment = () => {
  return (process.env.environment || 'dev').toLocaleLowerCase()
}
