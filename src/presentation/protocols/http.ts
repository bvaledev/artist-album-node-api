export interface HttpResponse {
  statusCode: number
  body: any
}

export interface HttpRequest {
  headers?: any
  query?: any
  params?: any
  body?: any
}
