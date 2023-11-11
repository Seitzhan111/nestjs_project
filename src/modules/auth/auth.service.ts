import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AppError } from '../../common/constants/error';
import { UserLoginDto } from './dto/user-login.dto';
import * as bcrypt from 'bcrypt'
import { AuthUserResponse } from './response';
import { TokenService } from '../token/token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly tokenService: TokenService
  ) {}

  async registerUsers (dto: CreateUserDto): Promise<CreateUserDto> {
    const existUser = await this.userService.findUserByEmail(dto.email)
    if (existUser) throw new BadRequestException(AppError.USER_EXIST)
    return this.userService.createUser(dto)
  }

  async loginUser (dto: UserLoginDto): Promise<any> {
    const existUser = await this.userService.findUserByEmail(dto.email)
    if (!existUser) throw new BadRequestException(AppError.USER_NOT_EXIST)
    const validatePassword = await bcrypt.compare(dto.password, existUser.password)
    if (!validatePassword) throw new BadRequestException(AppError.WRONG_DATA)
    const user = await this.userService.publicUser(dto.email)
    const token = await this.tokenService.generateJwtToken(user)
    return {user, token}
  }
}
