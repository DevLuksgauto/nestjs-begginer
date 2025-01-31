import { DynamicModule, Module } from '@nestjs/common'
import { EnvConfigService } from './env-config.service'
import {
    ConfigModule,
    ConfigModuleOptions,
    ConfigService,
} from '@nestjs/config'
import { join } from 'node:path'

@Module({
    providers: [EnvConfigService],
})
export class EnvConfigModule {
    static forRoot<ValidationOptions extends Record<string, any>>(
        options?: ConfigModuleOptions<ValidationOptions>,
    ): DynamicModule {
        return {
            module: EnvConfigModule,
            imports: [
                ConfigModule.forRoot({
                    ...options,
                    envFilePath: [
                        join(
                            __dirname,
                            `../../../../.env.${process.env.NODE_ENV}`,
                        ),
                    ],
                }),
            ],
            providers: [EnvConfigService, ConfigService],
            exports: [EnvConfigService, ConfigService],
        }
    }
}
