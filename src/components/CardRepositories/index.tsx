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
			typescript: "#165CAA",
			javascript: "#F0DB4F",
			python: "#165CAA",
			ruby: "#F80102",
			java: "#F0DB4F",
			c: "#F7941E",
			"c++": "#F7941E",
			"c#": "#787CB5",
			php: "#787CB5",
			go: "#3EB049",
			swift: "#F7941E",
			rust: "#787CB5",
			kotlin: "#165CAA",
			"objective-c": "#165CAA",
			html: "#F7941E",
			null: "#FFFFFF",
			css: "#F36AA0",
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
						<span className={`h-3 w-3 rounded-full self-center mr-1`} style={{backgroundColor: selectColor()}}></span>
						{repository.language || "Indefinido"}
					</span>
					<span className="text-xs text-gray-300">Criado em {moment(repository.created_at).format("DD/MM/YYYY")}</span>
				</div>
			</div>
		</div>
	);
};

export default CardRepositories;
