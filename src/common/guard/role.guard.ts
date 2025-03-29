import { Injectable, CanActivate, ExecutionContext, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Role } from 'src/modules/user/enum/role.enum'

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) { }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const roles = this.reflector.get<Role[]>('roles', context.getHandler())
        if (!roles) return true

        const { user } = context.switchToHttp().getRequest()

        if (!user) throw new NotFoundException('Admin not found.')

        const hasPermission = roles.includes(user.role as Role)

        if (!hasPermission) throw new UnauthorizedException()
        return hasPermission
    }
}