import { InvalidParamError } from '@/presentation/errors'
import { Validation } from '@/presentation/protocols/validation'

export class EmailValidator implements Validation {
  constructor(
    private readonly fieldName: string
  ) { }

  validate(input: any): Error {
    const regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    if (input[this.fieldName] && !regex.test(input[this.fieldName])) {
      return new InvalidParamError(this.fieldName)
    }
  }
}
