import ButtonDefault from '../../components/ButtomDefault';
import Image from 'next/image';
import toast from 'react-hot-toast';
import React, { FC, useState } from 'react';
import Container from '@mui/material/Container';
import useGithubProfile from '../../context/hooks/github/profile/useGithubProfile';
import InputDefault from '../../components/InputDefault';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const pattern = new RegExp(
	'^(https?:\\/\\/)?' +
		'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
		'((\\d{1,3}\\.){3}\\d{1,3}))' +
		'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
		'(\\?[;&a-z\\d%_.~+=-]*)?' +
		'(\\#[-a-z\\d_]*)?$',
	'i'
);

const schema = yup.object().shape({
	username: yup.string().required(() => {toast.error("Informe um usuário"); return ""}),
})

interface IUserForm {
    username: string
}

const Home: FC = () => {
    const [loading, setLoading] = useState<boolean>(false)

    const methods = useForm({ resolver: yupResolver(schema), mode: 'onBlur' })
    const { handleSubmit } = methods

	const { handleCallMyUser, error } = useGithubProfile();

	const handleCallMyUserProfile = async (data: IUserForm) => {
		try {
			setLoading(true)
			const reg = pattern.test(data.username);
			if (!!reg)
				return toast.error(`Apenas o username do Github é valido`);
			await handleCallMyUser(data.username);
			toast.success(`Usuário ${data.username} foi encontrado com sucesso`);
		} catch {
			toast.error(`O Usuário ${data.username} não foi encontrado`);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='h-screen text-white'>
			<Container maxWidth='lg' style={{ height: '100%' }}>
				<div className='w-full flex justify-center h-full'>
					<FormProvider {...methods}>
                    <form
							action=""
							className="self-center"
							onSubmit={handleSubmit(handleCallMyUserProfile)}
						>
						<div>
							<h1 className='text-2xl sm:text-4xl font-bold mb-6'>
								Digite o usuário do github
							</h1>
							<InputDefault
								name='username'
                                id="username"
								className='text-black'
								error={error}
								icon={
									<Image
										src='/assets/icons/github.svg'
										width={25}
										height={25}
										alt='icon-spin'
									/>
								}
							/>
							<div className='w-32 mx-auto mt-10'>
								<ButtonDefault
									id='button-search'
									loading={loading}
									type="submit"
								>
									Buscar
								</ButtonDefault>
							</div>
						</div>
                        </form>
					</FormProvider>
				</div>
			</Container>
		</div>
	);
};

export default Home;
