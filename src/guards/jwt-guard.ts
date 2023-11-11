import { AuthGuard } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

// @ts-ignore
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}