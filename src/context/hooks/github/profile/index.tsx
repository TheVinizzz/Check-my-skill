import React, { createContext, FC, useCallback, useRef, useState } from 'react'
import { IProfile } from '../../../../interfaces/Profile';
import axios from 'axios';
import toast from 'react-hot-toast';
import router from 'next/router'

import { UseGithubProfileReturn } from './interfaces'
import { IRepository } from '../../../../interfaces/Repository'

export const GithubProfileContext =
	createContext<UseGithubProfileReturn>({} as UseGithubProfileReturn)

const INITIAL_PROFILE = {} as IProfile

// eslint-disable-next-line react/prop-types
export const GithubProfileProvider: FC = ({ children }) => {
	const [loading, setLoading] = useState(false)
	const [profile, setProfile] = useState<IProfile>(INITIAL_PROFILE)
	const [repository, setRepository] = useState<IRepository[]>([])
    const [error, setError] = useState<boolean>(false);
    
    const handleCallMyUser = async (userName: string) => {
        try {
            setLoading(true)
            setError(false)
            const {data} = await axios.get(`https://api.github.com/users/${userName}`)
            setProfile(data as IProfile)
            router.push(`/user/${userName}`)
        }
        catch {
            setError(true)
            throw new Error("Usuário não encontrado")
        }
        finally {
            setLoading(false)
        }
    }

    const handleCallMyRepositories = async (userName: string) => {
        try {
            const {data} = await axios.get(`https://api.github.com/users/${userName}/repos`)
            setRepository(data as IRepository[])
        }
        catch {
            setError(true)
            toast.error(`O Usuário ${userName} não foi encontrado`)
        }
        finally {
            setLoading(false)
        }
    }

	return (
		<GithubProfileContext.Provider
			value={{
				initialProfile: INITIAL_PROFILE,
				handleCallMyUser,
                handleCallMyRepositories,
                error,
                profile,
                repository
			}}
		>
			{children}
		</GithubProfileContext.Provider>
	)
}
