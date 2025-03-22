import { Store, StoreConfig } from '@datorama/akita';
import { TokenSlice } from '../models/models';
import { Injectable } from '@angular/core';

const INIT_STATE = {
    jwt: '',
    refreshToken: '',
    isAuthenticated: false
};

@Injectable()
@StoreConfig({name: "token"})
export class TokenStore extends Store<TokenSlice>{
    
    constructor() {
        super(INIT_STATE);
    }

    setToken(jwtGot: string, refreshTokenGot: string) {
        this.update(
            {   
                jwt: jwtGot,
                refreshToken: refreshTokenGot,
                isAuthenticated: true
            }
        );
    }

    clearToken() {
        this.update(INIT_STATE);
    }


}