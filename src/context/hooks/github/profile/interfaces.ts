import React from 'react'
import { IProfile } from '../../../../interfaces/Profile';
import { IRepository } from '../../../../interfaces/Repository';

export interface UseGithubProfileReturn {
	initialProfile: IProfile
	profile: IProfile
    repository: IRepository[]
    error: boolean
    handleCallMyUser: (userName: string) => Promise<void>
    handleCallMyRepositories: (userName: string) => Promise<void>
}
