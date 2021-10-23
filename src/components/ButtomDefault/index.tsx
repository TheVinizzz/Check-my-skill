import Image from 'next/image'
import React, { FC } from 'react'

interface IType extends React.HTMLAttributes<HTMLButtonElement> {
	children?: React.ReactNode
	id: string
	customBorder?: string
	customClasses?: string
	customBackground?: string
	onClick?:
		| ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
		| undefined
	type?: 'button' | 'submit' | 'reset'
	loading?: boolean
	disabled?: boolean
}

const ButtonDefault: FC<IType> = ({
	children,
	id,
	customBorder,
	customBackground,
	type,
	onClick,
	loading,
	disabled = false,
	customClasses = ''
}) => (
	<button
		className={`
		block text-center text-white bg-primary-blue-light p-3 duration-300
		rounded-full hover:bg-primary-blue-dark w-full relative h-12
		${customBorder ? `border-2 border-${customBorder}` : ''}
		${customBackground ? `bg-${customBackground}` : ''}
		${loading ? 'cursor-wait' : ''}
		${disabled ? 'cursor-not-allowed bg-neutral-gray hover:bg-neutral-gray' : ''}
		${customClasses}
		`}
		id={id}
		type={type}
		onClick={onClick}
		disabled={loading || disabled}
	>
		<div className={loading ? 'invisible' : ''}>{children}</div>
		{loading && (
			<div className="absolute inset-0 flex justify-center">
				<div className="self-center pt-1">
					<Image
						src="/assets/icons/spin-loading.svg"
						width={60}
						height={60}
						alt="icon-spin"
						className="animate-spin"
					/>
				</div>
			</div>
		)}
	</button>
)

export default ButtonDefault
