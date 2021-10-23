import React, { FC } from 'react'
import { SiJavascript } from 'react-icons/si';
import { IRepository } from '../../interfaces/repository';

type ICard = {
    keyString: string
    repository: IRepository
}

const CardRepositories: FC<ICard> = ({ keyString, repository }) => {
    return (
        <div className='bg-dark-default w-full h-40 rounded border-gray-500 border mx-auto transform md:hover:scale-105 transition duration-300' key={keyString}>
            {repository.name}
        </div>
    )
}

export default CardRepositories