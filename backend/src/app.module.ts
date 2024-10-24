import {Module} from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import { UserModule } from './user/user.module';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost/nestjs-social-app'),
        UserModule,
    ]
})
export class AppModule {
}
