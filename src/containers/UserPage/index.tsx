import ButtonDefault from "../../components/ButtomDefault"
import React, { FC, useState, useEffect } from 'react'
import Container from '@mui/material/Container';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import toast from 'react-hot-toast'
import Router, { useRouter } from 'next/router'

const UserPage: FC = () => {
    const [user, setUser] = useState<any>(null)
    const [userRepos, setUserRepos] = useState<any>(null)
    const [error, setError] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(true)

    const router = useRouter()
    const { userRouter } = router.query

    useEffect(() => {
        const handleCallMyUser = async () => {
            try {
                setError(false)
                setUser(null)
                const callUser = await axios.get(`https://api.github.com/users/${userRouter}`)
                const callUserRepos = await axios.get(`https://api.github.com/users/${userRouter}/repos`)
                setUser(callUser.data)
                setUserRepos(callUserRepos.data)
            }
            catch {
                setError(true)
                toast.error(`O Usuário ${userRouter?.toString()} não foi encontrado`)
            }
            finally {
                setLoading(false)
            }
        }
        if (!!userRouter) {
            handleCallMyUser()
        }
    }, [userRouter])

    return (
        <div className="bg-dark-default h-screen text-white">
            <Container maxWidth="lg">
                {loading ? (
                    <div>loading...</div>
                )
                    : (
                        <div>
                            {user && (
                                <>
                                    <Avatar alt="Remy Sharp" src={user.avatar_url} />
                                    <h1>{user.login}</h1>
                                    <h1>{user.name}</h1>
                                    <h1>{user.repos_url.length}</h1>
                                </>
                            )}
                            {error && (
                                <h1>Verifique seu usuario</h1>
                            )}
                        </div>
                    )
                }

            </Container>
        </div>
    )
}

export default UserPage
