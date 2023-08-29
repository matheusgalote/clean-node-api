import { UnauthorizedError } from '../../errors'
import { ServerError } from '../../errors/server-error'
import type { HttpResponse } from '../../protocols/http'

export function badRequest (error: Error): HttpResponse {
  return {
    statusCode: 400,
    body: error
  }
}

export function unauthorized (): HttpResponse {
  return {
    statusCode: 401,
    body: new UnauthorizedError()
  }
}

export function serverError (error: Error): HttpResponse {
  return {
    statusCode: 500,
    body: new ServerError(error.stack)
  }
}

export function ok (data: any): HttpResponse {
  return {
    statusCode: 200,
    body: data
  }
}
