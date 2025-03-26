import { createStore, select, withProps } from '@ngneat/elf';
import { inject, Injectable } from '@angular/core';
import { PostService } from '../services/post.service';
import { Observable } from 'rxjs';
import { state } from '@angular/animations';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SavedNFollowsProps {
    savedPosts: string[]
    follows: string[]
}

const INIT_STATE = {
    savedPosts: [],
    follows: []
}

const store = createStore({ name: 'savedNFollows' }, withProps<SavedNFollowsProps>(INIT_STATE));

@Injectable({ providedIn: 'root' })
export class SavedNFollowsRepository {
    
    loadSaved(saved: string[]) {
        console.log("inloading saved")
        store.update((state) => {
            return {
                ...state,
                savedPosts: saved
            }
        })
        console.log(store.state)
    }

    loadFollowed(followed: string[]) {
        console.log("inloading followed")

        store.update((state) => {
            return {
                ...state,
                follows: followed
            }
        })
    }

    toggleLike(postId: string) {
        store.update((state) => {
            const savedPosts = state.savedPosts.includes(postId)
            ? state.savedPosts.filter(id => id !== postId)
            : [...state.savedPosts, postId];

            return {
                ...state,
                savedPosts: savedPosts
            };
        })
    }

    isPostLiked(postId: string): Observable<boolean> {
        return store.pipe(select((state) => state.savedPosts.includes(postId)));
    }

    toggleFollow(userId: string) {
        store.update((state) => {
            const following = state.follows.includes(userId)
            ? state.follows.filter(id => id !== userId)
            : [...state.follows, userId];

            return {
                ...state,
                follows: following
            };
        })
    }

    isFollowing(userId: string): Observable<boolean> {
        return store.pipe(select((state) => state.follows.includes(userId)));
    }
}
