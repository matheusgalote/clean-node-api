import { type Condition, type ObjectId } from 'mongodb'
export interface UpdateAccessTokenRepository {
  updateAccessToken(id: Condition<ObjectId> | string, token: string): Promise<void>
}
