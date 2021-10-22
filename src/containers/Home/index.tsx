import ButtonDefault from "../../components/ButtomDefault"
import Image from 'next/image'
import React, { FC, useState } from 'react'
import Container from '@mui/material/Container';
import axios from 'axios';
import toast from 'react-hot-toast'
import InputDefault from "../../components/InputDefault";
import router from 'next/router'

const Home: FC = () => {
    const [user, setUser] = useState<any>(null)
    const [name, setName] = useState<string>("")
    const [error, setError] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)

    const handleCallMyUser = async () => {
        try {
            setLoading(true)
            setError(false)
            setUser(null)
            await axios.get(`https://api.github.com/users/${name}`)
            toast.success(`Usuário ${name} foi encontrado com sucesso`)
            router.push(`/user/${name}`)
        }
        catch {
            setError(true)
            toast.error(`O Usuário ${name.toUpperCase()} não foi encontrado`)
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <div className="bg-dark-default h-screen text-white">
            <Container maxWidth="lg" style={{ height: "100%" }}>
                <div className="w-full flex justify-center h-full">
                    <div className="self-center">
                        <h1 className="text-4xl font-bold mb-6">Digite o usuário do github</h1>
                        <InputDefault name="input-search" className="text-black" onChange={(e: any) => setName(e.target.value)} error={error} icon={<Image
						src="/assets/icons/github.svg"
						width={25}
						height={25}
						alt="icon-spin"
					/>}/>
                        <div className="w-32 mx-auto mt-10">
                            <ButtonDefault id="button-search" loading={loading} onClick={handleCallMyUser}>Buscar</ButtonDefault>
                        </div>

                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Home
