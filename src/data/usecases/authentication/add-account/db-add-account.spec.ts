import { AddAccountRepository } from '@/data/protocols/db/authentication/add-account-repository'
import { mockAccountModel, mockAddAccountParams, mockAddAccountRepository } from '@/data/test/mock-account'
import { DbAddAccount } from './db-add-account'

interface SutTypes {
  sut: DbAddAccount
  addAccountRepo: AddAccountRepository
}

const makeSut = (): SutTypes => {
  const addAccountRepo = mockAddAccountRepository()
  const sut = new DbAddAccount(addAccountRepo)
  return {
    sut,
    addAccountRepo
  }
}

describe('DbAddAccount UseCase', () => {
  test('Should return an accont on sucess', async () => {
    const { sut } = makeSut()
    const addAccountRepository = await sut.add(mockAddAccountParams())
    expect(addAccountRepository).toEqual(mockAccountModel())
  })
})
