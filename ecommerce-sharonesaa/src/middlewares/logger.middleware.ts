import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const now = new Date().toLocaleString(); // Incluye fecha y hora
    console.log(`[${now}] Estás ejecutando un método ${req.method} en la ruta ${req.originalUrl}`);
    next();
  }
}

  export function loggerGlobal(req: Request, res: Response, next: NextFunction) {
    const now = new Date().toLocaleString(); // Incluye fecha y hora
    console.log(`[${now}] Estás ejecutando un método ${req.method} en la ruta ${req.originalUrl}`);
    next();
  }

