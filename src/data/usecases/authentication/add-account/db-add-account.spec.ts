import { AddAccountRepository } from '@/data/protocols/db/authentication/add-account-repository'
import { mockAccountModel, mockAddAccountParams, mockAddAccountRepository } from '@/data/test/mock-account'
import { DbAddAccount } from './db-add-account'

interface SutTypes {
  sut: DbAddAccount
  addAccountRepoStub: AddAccountRepository
}

const makeSut = (): SutTypes => {
  const addAccountRepoStub = mockAddAccountRepository()
  const sut = new DbAddAccount(addAccountRepoStub)
  return {
    sut,
    addAccountRepoStub
  }
}

describe('DbAddAccount UseCase', () => {
  test('Should call Hasher with correct password', async () => {
  })

  test('Should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepoStub } = makeSut()
    const addSpy = jest.spyOn(addAccountRepoStub, 'add')
    await sut.add(mockAddAccountParams())
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password'
    })
  })
  test('Should throw if AddAccount throws', async () => {
    const { sut, addAccountRepoStub } = makeSut()
    jest.spyOn(addAccountRepoStub, 'add').mockImplementationOnce((): never => {
      throw new Error()
    })
    const promise = sut.add(mockAddAccountParams())
    await expect(promise).rejects.toThrow()
  })
  test('Should return an accont on sucess', async () => {
    const { sut } = makeSut()
    const addAccountRepository = await sut.add(mockAddAccountParams())
    expect(addAccountRepository).toEqual(mockAccountModel())
  })
})
