import { Test, TestingModule } from '@nestjs/testing'
import { EnvConfigService } from '../../env-config.service'
import { EnvConfigModule } from '../../env-config.module'
import { ConfigModule } from '@nestjs/config'

describe('EnvConfigService unit tests', () => {
    let sut: EnvConfigService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [ConfigModule.forRoot({}), EnvConfigModule.forRoot()],
            providers: [EnvConfigService],
        }).compile()

        sut = module.get<EnvConfigService>(EnvConfigService)
    })

    it('should be defined', () => {
        expect(sut).toBeDefined()
    })

    it('should return the app port', () => {
        const port = sut.getAppPort()
        expect(port).toBeDefined()
        expect(typeof port).toBe('number')
    })

    it('should return the node environment', () => {
        const nodeEnv = sut.getNodeEnv()
        expect(nodeEnv).toBeDefined()
        expect(typeof nodeEnv).toBe('string')
    })
})
