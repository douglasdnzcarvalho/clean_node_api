export type HttpResponse = {
  statusCode: number
  body: any
}

export type HttpRequest = {
  body?: any
  params?: { [key: string]: string }
  headers?: { [key: string]: string }
  accountId?: string
}
