import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Permission, RolePermissions } from '../constants/permissions.constant';
import { PERMISSIONS_KEY } from '../decorators/permissions.decorator';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndOverride<Permission[]>(PERMISSIONS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    
    if (!requiredPermissions || requiredPermissions.length === 0) {
      return true;
    }
    
    const { user } = context.switchToHttp().getRequest();
    if (!user || !user.role) {
      return false;
    }

    const userPermissions = RolePermissions[user.role as keyof typeof RolePermissions] || [];
    
    return requiredPermissions.every((permission) => userPermissions.includes(permission));
  }
}
