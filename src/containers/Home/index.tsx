import ButtonDefault from "../../components/ButtomDefault"
import Image from 'next/image'
import toast from 'react-hot-toast';
import React, { FC, useState } from 'react'
import Container from '@mui/material/Container';
import useGithubProfile from "../../context/hooks/github/profile/useGithubProfile"
import InputDefault from "../../components/InputDefault";

const pattern = new RegExp('^(https?:\\/\\/)?'+
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+
            '((\\d{1,3}\\.){3}\\d{1,3}))'+
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+
            '(\\?[;&a-z\\d%_.~+=-]*)?'+ 
            '(\\#[-a-z\\d_]*)?$','i');

const Home: FC = () => {
    const [name, setName] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)

    const {handleCallMyUser, error} = useGithubProfile()

    const handleCallMyUserProfile = async () => {
        try {
            setLoading(true)
            const reg = pattern.test(name);
            if(!!reg) return toast.error(`Apenas o username do Github é valido`) 
            await handleCallMyUser(name)
            toast.success(`Usuário ${name} foi encontrado com sucesso`)
        }
        catch {
            toast.error(`O Usuário ${name} não foi encontrado`)
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <div className="h-screen text-white">
            <Container maxWidth="lg" style={{ height: "100%" }}>
                <div className="w-full flex justify-center h-full">
                    <div className="self-center">
                        <h1 className="text-2xl sm:text-4xl font-bold mb-6">Digite o usuário do github</h1>
                        <InputDefault name="input-search" className="text-black" onChange={(e: any) => setName(e.target.value)} error={error} icon={<Image
						src="/assets/icons/github.svg"
						width={25}
						height={25}
						alt="icon-spin"
					/>}/>
                        <div className="w-32 mx-auto mt-10">
                            <ButtonDefault id="button-search" loading={loading} onClick={handleCallMyUserProfile}>Buscar</ButtonDefault>
                        </div>

                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Home
