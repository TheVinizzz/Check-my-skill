import React, { FC } from 'react';
import { IRepository } from '../../interfaces/Repository';
import moment from "moment"

type ICard = {
	repository: IRepository;
	selectRepository: (nameRepository: string) => any;
};

const CardRepositories: FC<ICard> = ({ repository, selectRepository }) => {
	const clickInCard = () => {
		selectRepository(repository.name);
	};

	const selectColor = () => {
		const colorLanguage: any = {
			typescript: "blue",
			javascript: "yellow",
			python: "blue",
			ruby: "red",
			java: "yellow",
			c: "purple",
			"c++": "purple",
			"c#": "purple",
			php: "purple",
			go: "purple",
			swift: "green",
			rust: "purple",
			kotlin: "blue",
			"objective-c": "blue",
			html: "indigo",
			null: "gray",
			css: "pink",
		}
		const selectColor = repository?.language?.toLowerCase() || ""
		return colorLanguage[selectColor] || colorLanguage["null"]
	}

	return (
		<div
			className='bg-dark-default w-full h-40 rounded border-gray-500 border mx-auto transform md:hover:scale-105 transition duration-300 cursor-pointer p-2'
			onClick={clickInCard}
		>
			<div className="flex flex-col h-full justify-between">
				<div className="flex flex-col">
					<span>{repository.name.length < 30 ? repository.name : (repository.name.substring(0, 30) + "...")}</span>
					<span className="text-xs text-gray-300 mt-3">{repository.description}</span>
				</div>
				<div className="flex w-full justify-between">
					<span className="flex text-xs text-gray-300">
						<span className={`h-3 w-3 rounded-full bg-${selectColor()}-c self-center mr-1`}></span>
						{repository.language}
					</span>
					<span className="text-xs text-gray-300">Criado em {moment(repository.created_at).format("DD/MM/YYYY")}</span>
				</div>
			</div>
		</div>
	);
};

export default CardRepositories;
