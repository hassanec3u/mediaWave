import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {User} from "../schema/userSchema";
import {CreateUserDto} from "../dto/createUserDto.";


@Injectable()
export class UserDao {
    constructor(
        @InjectModel(User.name)
        private readonly _personModel: Model<User>,
    ) {}


    save(createUserDto: CreateUserDto): void {
        const newUser = new this._personModel(createUserDto);
        newUser.save().then((r: User) => {
            console.log('User saved successfully:', r);
            return r;
        }).catch(err => {
            console.error('Error saving user:', err);
            throw err;
        });
    }

    findByUsername(username: string): Promise<User | null> {
        return this._personModel.findOne({ username }).exec();
    }

}