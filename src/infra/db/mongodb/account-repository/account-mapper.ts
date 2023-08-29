import { type AccountModel } from '../../../../domain/models/account'

export const map = async (accountCollection: any, result: any): Promise<AccountModel> => {
  const { insertedId: id } = result
  const accountById = await accountCollection.findOne({ _id: id })
  const { _id, ...accountWithoutId } = accountById
  const account = Object.assign(
    {},
    accountWithoutId,
    { id: _id.toHexString() }
  ) as AccountModel

  return account
}

export const getMap = async (accountData: any): Promise<AccountModel> => {
  const { _id, ...accountWithoutId } = accountData
  const account = Object.assign(
    {},
    accountWithoutId,
    { id: _id.toHexString() }
  ) as AccountModel

  return account
}
