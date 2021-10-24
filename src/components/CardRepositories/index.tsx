import React, { FC } from 'react';
import { IRepository } from '../../interfaces/Repository';

type ICard = {
	repository: IRepository;
	selectRepository: (nameRepository: string) => any;
};

const CardRepositories: FC<ICard> = ({ repository, selectRepository }) => {
	const clickInCard = () => {
		selectRepository(repository.name);
	};

	return (
		<div
			className='bg-dark-default w-full h-40 rounded border-gray-500 border mx-auto transform md:hover:scale-105 transition duration-300 cursor-pointer'
			onClick={clickInCard}
		>
			{repository.name}
		</div>
	);
};

export default CardRepositories;
