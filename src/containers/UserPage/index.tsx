import ButtonDefault from '../../components/ButtomDefault';
import React, { FC, useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import toast from 'react-hot-toast';
import Router, { useRouter } from 'next/router';
import CircularProgress from '@mui/material/CircularProgress';
import { SiJavascript } from 'react-icons/si';
import CardRepositories from '../../components/CardRepositories';

const UserPage: FC = () => {
	const [user, setUser] = useState<any>(null);
	const [userRepos, setUserRepos] = useState<any>([]);
	const [error, setError] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(true);

	const router = useRouter();
	const { userRouter } = router.query;

	const handleRedirect = () => {
		router.push(`https://github.com/${userRouter}`);
	};

	useEffect(() => {
		const handleCallMyUser = async () => {
			try {
				setError(false);
				setUser(null);
				const callUser = await axios.get(
					`https://api.github.com/users/${userRouter}`
				);
				const callUserRepos = await axios.get(
					`https://api.github.com/users/${userRouter}/repos`
				);
				setUser(callUser.data);
				setUserRepos(callUserRepos?.data);
			} catch {
				setError(true);
				toast.error(
					`O Usuário ${userRouter?.toString()} não foi encontrado`
				);
			} finally {
				setLoading(false);
			}
		};
		if (!!userRouter) {
			handleCallMyUser();
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
					{user && (
						<>
							<div className='flex flex-col md:flex-row mb-10'>
								<div className="self-center">
									<Avatar
										alt='avatar'
										src={user.avatar_url}
										sx={{ width: 200, height: 200 }}
									/>
								</div>
								<div className='md:self-center sm:ml-10 text-center md:text-left'>
									<h1 className='text-3xl font-bold'>
										{user.name}
									</h1>
									<h1
										className='hover:underline cursor-pointer w-auto mt-1'
										onClick={handleRedirect}
									>
										@{user.login}
									</h1>
									<div className="my-1 flex w-full justify-center md:justify-start">
										<h1 className="font-bold mr-4">{user.followers} Seguidores</h1>
										<h1 className="font-bold">{user.following} Seguindo</h1>
									</div>
									<p className='text-sm max-w-md mt-2'>{user.bio}</p>
									
								</div>
							</div>
							<div className='w-full bg-dark-secondary py-4 px-6 rounded shadow-lg'>
								<div className='w-full grid grid-cols-1 md:grid-cols-3 gap-4'>
									{userRepos.map((val: any) => (
										<CardRepositories />
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
