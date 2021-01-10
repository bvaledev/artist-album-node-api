export class DataExistsError extends Error {
  constructor() {
    super('This data alread exists in database')
    this.name = 'DataExistsError'
  }
}
