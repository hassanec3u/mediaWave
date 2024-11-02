import {BadRequestException, ConflictException, Injectable} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {UserDao} from "../user/dao/UserDao";
import {CreateUserDto} from "../user/dto/createUserDto.";
import * as bcrypt from 'bcrypt';
import {LoginUserDto} from "../user/dto/LoginUserDto";
import e from 'express';

/**
 * AuthService handles the authentication logic for the application.
 */
@Injectable()
export class AuthService {
    constructor(
        private userDao: UserDao,
        private jwtService: JwtService,
    ) {}


    async register(createUserDto: CreateUserDto) {
        if (createUserDto.password !== createUserDto.passwordConfirm) {
            throw new BadRequestException('Passwords do not match');
        }

        const user = await this.userDao.findByUsername(createUserDto.username);
        if (user) {
            throw new ConflictException('User already exists');
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

        this.userDao.save({...createUserDto, password: hashedPassword});
    }


    async login(loginDto: LoginUserDto) {

        //logg the user is trying to log in
        console.log('User trying to log in: ' + loginDto.username);

        const user = await this.userDao.findByUsername(loginDto.username);
        if (user && await bcrypt.compare(loginDto.password, user.password)) {
            const payload = {username: user.username};

            //log the user is logged in
            console.log('User logged in: ' + user.username);

            return {
                access_token: this.jwtService.sign(payload),
                userId: user._id,
            };
        }
        else {
            //log the user failed to log in
            console.error('User failed to log in: ' + loginDto.username );
        }

        //throw an error if the user is not found
        throw new BadRequestException('Invalid credentials');
        
    }
}