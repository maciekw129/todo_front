import { inject } from "@angular/core";
import { TokenService } from "./token.service";
import { AuthStatefulService } from "./auth-stateful.service";

export const initializeAuth = () => {
    const tokenService = inject(TokenService);
    const authStatefulService = inject(AuthStatefulService);

    const { token, decodedToken } = tokenService;

    if(token) {
        if(!tokenService.isTokenExpired() && decodedToken!.sub) {
            authStatefulService.fetchUser(token);
        } else if(tokenService.isTokenExpired()) {
            tokenService.removeToken();
        }
    }
}