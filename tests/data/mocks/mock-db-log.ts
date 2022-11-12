import { LogErrorRepository } from '@/data/protocols/db/log'

export const mockLogErrorRepository = (): LogErrorRepository => {
  class LogErrorRepositoryStub implements LogErrorRepository {
    async log (stack: string): Promise<void> { }
  }

  return new LogErrorRepositoryStub()
}
