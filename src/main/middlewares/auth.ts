import { adaptMiddleware } from "../adapters/express/express-middleware-adapter"
import { makeAuthMiddleware } from "../factories/middlewares/auth-middleware"

export const adminAuth = adaptMiddleware(makeAuthMiddleware('admin'))
export const auth = adaptMiddleware(makeAuthMiddleware())
