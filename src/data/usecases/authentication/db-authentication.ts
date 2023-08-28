import {
  type Authentication,
  type AuthenticationModel,
  type HashComparer,
  type LoadAccountByEmailRepository,
  type Encrypter,
  type UpdateAccessToken
} from './db-authentication-protocols'
export class DbAuthentication implements Authentication {
  private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  private readonly hashComparer: HashComparer
  private readonly encrypter: Encrypter
  private readonly updateAccessTokenRepository: UpdateAccessToken

  constructor (
    loadAccountByEmailRepository: LoadAccountByEmailRepository,
    hashComparer: HashComparer,
    encrypter: Encrypter,
    updateAccessTokenRepository: UpdateAccessToken
  ) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository
    this.hashComparer = hashComparer
    this.encrypter = encrypter
    this.updateAccessTokenRepository = updateAccessTokenRepository
  }

  async auth (authentication: AuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(authentication.email)

    if (account) {
      const isValidPassword = await this.hashComparer.compare(authentication.password, account.password)
      if (isValidPassword) {
        const accessToken = await this.encrypter.encrypt(String(account.id))
        await this.updateAccessTokenRepository.updateAccessToken(String(account.id), accessToken)
        return accessToken
      }
    }
    return null
  }
}
