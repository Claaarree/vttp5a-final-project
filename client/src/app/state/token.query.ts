import { Query } from "@datorama/akita";
import { TokenSlice } from "../models/models";
import { TokenStore } from "./token.store";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class TokenQuery extends Query<TokenSlice>{
    constructor(private tokenStore: TokenStore) {
        super(tokenStore);
    }

    getJwtToken(): Observable<string> {
        return this.select((state: TokenSlice) => state.jwt);
    }

    getRefreshToken(): Observable<string> {
        return this.select((state: TokenSlice) => state.refreshToken);
    }

    getIsAuthenticated(): Observable<boolean> {
        return this.select((state: TokenSlice) => state.isAuthenticated);
    }

}