import {Module} from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost/nestjs-social-app'),
        AuthModule,
    ]
})
export class AppModule {
}
