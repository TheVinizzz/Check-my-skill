import React, { FC, useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Image from 'next/image';
import Avatar from '@mui/material/Avatar';
import toast from 'react-hot-toast';
import Router, { useRouter } from 'next/router';
import CircularProgress from '@mui/material/CircularProgress';
import useGithubProfile from '../../context/hooks/github/profile/useGithubProfile';
import ListRepositories from './components/ListRepositories';
import DetailsRepository from './components/DetailsRepository';
import LoadingPage from '../../components/LoadingPage';

export enum StageView {
    LIST_REPOSITORIES,
    DETAILS_REPOSOTIRIE
}
export interface IStage {
    stage: StageView
    nameRepository: string
}

const UserPage: FC = () => {
	const [loading, setLoading] = useState<boolean>(true);
    const [stagePage, setStagePage] = useState<IStage>({stage: StageView.LIST_REPOSITORIES} as IStage)

	const {handleCallMyRepositories, handleCallMyUser, profile, error, repository} = useGithubProfile()
    
	const router = useRouter();
	const { userRouter } = router.query;

	const handleRedirect = () => {
		window.open(`https://github.com/${userRouter}`, '_blank');
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
				setTimeout(() => setLoading(false), 2000);
			}
		};
		if (!!userRouter) {
			handleCallMyUserProfile();
		}
	}, [userRouter]);

    const renderStage = (stage: number) => {
        const listRender: any = {
            0: <ListRepositories repositories={repository} select={(stage: IStage) => setStagePage(stage)}/>,
            1: <DetailsRepository repository={stagePage?.nameRepository} select={() => setStagePage({stage: 0, nameRepository: ""})}/>
        }
        return listRender[stage]
    }

	if (loading) {
		return (
			<div className='h-screen text-white flex w-full justify-center'>
				<div className='self-center'>
					<LoadingPage />
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
							<div className='flex flex-col md:flex-row mb-10 animationFade'>
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
							{renderStage(stagePage.stage)}
						</>
					)}
					{error && <h1>Verifique seu usuario</h1>}
				</div>
			</Container>
		</div>
	);
};

export default UserPage;
