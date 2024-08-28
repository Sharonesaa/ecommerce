import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "src/roles.enum";
import { Observable } from "rxjs";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    canActivate(
        context: ExecutionContext
    ): boolean | Promise<boolean> | Observable<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
            context.getHandler(),
            context.getClass()
        ]);
    
        if (!requiredRoles) {
            // Opcional: Permitir el acceso si no se requieren roles específicos
            return true;
        }
    
        const request = context.switchToHttp().getRequest();
        const user = request.user;
    
        const hasRole = () => requiredRoles.some((role) => user?.roles?.includes(role));
        const valid = user && user.roles && hasRole();
    
        if (!valid) {
            throw new ForbiddenException(
                'You do not have permission and are not allowed to access this route'
            );
        }
    
        return valid;
    }
    
}
