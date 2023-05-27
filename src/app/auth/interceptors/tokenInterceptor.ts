import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { TokenService } from "../token.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    private tokenService = inject(TokenService);

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        if(req.url.includes("auth")) return next.handle(req);

        const token = this.tokenService.token;
        const Authorization = `Bearer ${token}`;

        return next.handle(req.clone({ setHeaders: { Authorization } }));
    }
}