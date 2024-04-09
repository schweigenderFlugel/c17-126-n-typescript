export default class HttpError {
  public status: number

  public description: string

  public details: string | undefined

  constructor(
    statusText: string,
    error: any | undefined,
    status: number = 500
  ) {
    this.status = status
    this.description = statusText
    this.details = error ?? undefined
  }
}
