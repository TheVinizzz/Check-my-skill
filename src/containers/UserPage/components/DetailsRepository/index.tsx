import { CircularProgress } from '@mui/material';
import React, { FC, useState, useEffect } from 'react';
import useGithubProfile from '../../../../context/hooks/github/profile/useGithubProfile';
import { IoArrowBackSharp } from 'react-icons/io5';

type IDetailsRepository = {
	repository: string;
    select: () => any
};

const DetailsRepository: FC<IDetailsRepository> = ({
	repository, select
}: IDetailsRepository) => {
	const [loading, setLoading] = useState<boolean>(true);

	const {
		profile,
		error,
		handleCallMyDetailsRepository,
		clearStateDetailsRepository,
		detailsRepository
	} = useGithubProfile();

    const backListRepository = () => {
        clearStateDetailsRepository()
        select()
    }

	useEffect(() => {
		const handleCallRepository = async () => {
			try {
				await handleCallMyDetailsRepository(profile.login, repository);
			} catch {
			} finally {
				setLoading(false);
			}
		};
		if (!!repository && repository !== detailsRepository.name) {
			handleCallRepository();
		}
	}, [repository]);

	if (loading) {
		return (
			<div className='w-full bg-dark-secondary py-4 px-6 rounded shadow-lg animationFade flex justify-center h-52'>
				<CircularProgress color='inherit' className='self-center' />
			</div>
		);
	}

	return (
		<div className='w-full bg-dark-secondary py-4 px-6 rounded shadow-lg animationFade h-52'>
			<div className="animationFade">
				<span className='cursor-pointer flex font-bold hover:underline text-xl' onClick={backListRepository}>
					{' '}
					<IoArrowBackSharp className='self-center mr-1' />{' '}
					<span>Volta</span>
				</span>
				<div>{detailsRepository.name}</div>
			</div>
		</div>
	);
};

export default DetailsRepository;
