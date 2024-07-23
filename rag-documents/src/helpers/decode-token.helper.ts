export type TokenDecoded = {
  email: string
  name: string
  role: string
  accountId: string
  locale: string
  plan: string
  subscriptionId: string
  customerId: string
  userId: string
}

export const decodeToken = (token: string): TokenDecoded | undefined => {
  try {
    const decoded = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())
    const response = {
      email: decoded.email,
      name: decoded.name,
      locale: decoded.locale,
      role: decoded['custom:role'] || '',
      accountId: decoded['custom:accountId'] || '',
      plan: decoded['custom:plan'] || '',
      subscriptionId: decoded['custom:subscriptionId'] || '',
      customerId: decoded['custom:customerId'] || '',
      userId: decoded['custom:userId'] || '',
    }
    if (!response.email) throw new Error('email is required')
    if (!response.accountId) throw new Error('accountId is required')
    if (!response.userId) throw new Error('userId is required')
    if (!response.plan) throw new Error('plan is required')

    return response
  } catch (e) {
    console.error('error', e)
    return undefined
  }
}
