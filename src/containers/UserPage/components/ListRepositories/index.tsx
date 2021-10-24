import React, { FC } from 'react';
import { IStage, StageView } from '../..';
import CardRepositories from '../../../../components/CardRepositories';
import { IRepository } from '../../../../interfaces/Repository';

type IListRepositories = {
    repositories: IRepository[]
    select: (stage: IStage) => any
}

const ListRepositories: FC<IListRepositories> = ({repositories, select}: IListRepositories) => {

    const selectRepository = (nameRepository: string) => {
        select({stage: StageView.DETAILS_REPOSOTIRIE, nameRepository})
    }

	return (
		<div className='w-full bg-dark-secondary py-4 px-6 rounded shadow-lg animationFade'>
			<div className='w-full grid grid-cols-1 md:grid-cols-3 gap-4'>
				{repositories.map((repo: IRepository, i: number) => (
					<CardRepositories
						repository={repo}
                        key={`card-${i}`}
                        selectRepository={selectRepository}
					/>
				))}
			</div>
		</div>
	);
};

export default ListRepositories;
