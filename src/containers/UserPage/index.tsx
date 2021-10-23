import ButtonDefault from '../../components/ButtomDefault';
import React, { FC, useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import toast from 'react-hot-toast';
import Router, { useRouter } from 'next/router';
import CircularProgress from '@mui/material/CircularProgress';
import CardRepositories from '../../components/CardRepositories';
import { IRepository } from '../../interfaces/Repository';
import useGithubProfile from '../../context/hooks/github/profile/useGithubProfile';

const UserPage: FC = () => {
	const [loading, setLoading] = useState<boolean>(true);

	const {handleCallMyRepositories, handleCallMyUser, profile, error, repository} = useGithubProfile()

	const router = useRouter();
	const { userRouter } = router.query;

	const handleRedirect = () => {
		router.push(`https://github.com/${userRouter}`);
	};

	useEffect(() => {
		const handleCallMyUserProfile = async () => {
			try {
				await handleCallMyUser(userRouter as string)
				await handleCallMyRepositories(userRouter as string)
			} catch {
				toast.error(
					`O Usuário ${userRouter?.toString()} não foi encontrado`
				);
			} finally {
				setLoading(false);
			}
		};
		if (!!userRouter) {
			handleCallMyUserProfile();
		}
	}, [userRouter]);

	if (loading) {
		return (
			<div className='h-screen text-white flex w-full justify-center'>
				<div className='self-center'>
					<CircularProgress color='inherit' />
				</div>
			</div>
		);
	}

	return (
		<div className='h-screen text-white py-10 '>
			<Container maxWidth='lg' className="pb-10">
				<div>
					{profile && (
						<>
							<div className='flex flex-col md:flex-row mb-10'>
								<div className="self-center">
									<Avatar
										alt='avatar'
										src={profile.avatar_url}
										sx={{ width: 200, height: 200 }}
									/>
								</div>
								<div className='md:self-center sm:ml-10 text-center md:text-left mt-2 md:mt-0'>
									<h1 className='text-3xl font-bold'>
										{profile.name}
									</h1>
									<h1
										className='hover:underline cursor-pointer w-auto mt-1'
										onClick={handleRedirect}
									>
										@{profile.login}
									</h1>
									<div className="my-1 flex w-full justify-center md:justify-start">
										<h1 className="font-bold mr-4">{profile.followers} Seguidores</h1>
										<h1 className="font-bold">{profile.following} Seguindo</h1>
									</div>
									<p className='text-sm max-w-md mt-2'>{profile.bio}</p>
								</div>
							</div>
							<div className='w-full bg-dark-secondary py-4 px-6 rounded shadow-lg'>
								<div className='w-full grid grid-cols-1 md:grid-cols-3 gap-4'>
									{repository.map((repo: IRepository, i: number) => (
										<CardRepositories keyString={`card-${i}`} repository={repo}/>
									))}
								</div>
							</div>
						</>
					)}
					{error && <h1>Verifique seu usuario</h1>}
				</div>
			</Container>
		</div>
	);
};

export default UserPage;
