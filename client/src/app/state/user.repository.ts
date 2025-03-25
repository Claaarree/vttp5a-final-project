import { createStore, select, withProps } from '@ngneat/elf';
import { Injectable } from '@angular/core';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UserProps {
    userId: string,
    jwt: string,
    refreshToken: string,
    isAuthenticated: boolean
}

const INIT_STATE = {
    userId: '',
    jwt: '',
    refreshToken: '',
    isAuthenticated: false
}

const store = createStore({ name: 'user' }, withProps<UserProps>(INIT_STATE));

@Injectable({ providedIn: 'root' })
export class UserRepository {

    userId$ = store.pipe(select((state) => state.userId));
    jwt$ = store.pipe(select((state) => state.jwt));
    refreshToken$ = store.pipe(select((state) => state.refreshToken));
    isAuthenticated$ = store.pipe(select((state) => state.isAuthenticated));
    
    setToken(uid: string, tokenGot: string, refreshGot: string) {
        console.log("in set token")
        store.update((state) => ({
            userId: uid,
            jwt: tokenGot,
            refreshToken: refreshGot,
            isAuthenticated: true
        }));
    }

    clearToken() {
        store.update(state => INIT_STATE);
    }

}
