import ButtonDefault from '../../components/ButtomDefault';
import React, { FC, useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import toast from 'react-hot-toast';
import Router, { useRouter } from 'next/router';
import CircularProgress from '@mui/material/CircularProgress';
import { SiJavascript } from 'react-icons/si';

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
			<div className='bg-dark-default h-screen text-white flex w-full justify-center'>
				<div className='self-center'>
					<CircularProgress color='inherit' />
				</div>
			</div>
		);
	}

	return (
		<div className='h-screen text-white py-10'>
			<Container maxWidth='lg'>
				<div>
					{user && (
						<>
							<div className='flex flex-col md:flex-row mb-10'>
								<div className="self-center">
									<Avatar
										alt='Remy Sharp'
										src={user.avatar_url}
										sx={{ width: 200, height: 200 }}
									/>
								</div>
								<div className='md:self-center ml-10'>
									<h1 className='text-3xl font-bold whitespace-nowrap'>
										{user.name}
									</h1>
									<h1
										className='hover:underline cursor-pointer'
										onClick={handleRedirect}
									>
										@{user.login}
									</h1>
									<h1>{user.repos_url.length}</h1>
								</div>
								<div className='ml-5 self-center pr-4'>
									<h1 className='text-2xl font-bold mb-1'>
										Biografy:
									</h1>
									<p className='text-sm'>{user.bio}</p>
								</div>
							</div>
							<div className='w-full bg-dark-secondary py-4 px-6 rounded'>
								<div className='w-full grid grid-cols-1 md:grid-cols-3 gap-4 flex'>
									{userRepos.map((val: any) => (
										<div className='bg-dark-secondary w-60 h-40 rounded border-gray-500 border mx-auto'>
											{val.name}
										</div>
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
