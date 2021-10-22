/* eslint-disable react/prop-types */
import React, { FC } from 'react'
import InputMask from 'react-input-mask'

interface IInputDefault {
	id?: string
	name: string
	label?: string
	placeholder?: string
	className?: string
	type?: string
	getInput?: any
	error?: boolean
	isMandatory?: boolean
	onChange?: any
	maxLength?: number
	colorLabel?: string
	mask?: string
	errorMessage?: string
	maskChar?: string | null
	rules?: any
	defaultValue?: any
	icon?: any
	iconClick?: any
	value?: any
	rows?: number
}

const InputDefault: FC<IInputDefault> = ({
	id,
	name,
	label,
	placeholder,
	className,
	type = 'text',
	isMandatory,
	colorLabel,
	mask = '',
	icon,
	iconClick,
	errorMessage,
	maskChar = null,
	defaultValue,
	rows,
	...restProps
}) => {
	const handleClickIcon = (e: any) => {
		e.preventDefault()
		e.stopPropagation()
		if (iconClick) {
			iconClick()
		}
	}

	const renderField = () => {
		if (rows) {
			return (
				<textarea
					autoFocus
					id={id}
					rows={rows}
					defaultValue={defaultValue}
					className={`
				rounded px-4 py-2 mt-3 bg-gray-100 w-full border border-gray-300
				focus:outline-none focus:ring-1 focus:ring-primary-blue-light focus:border-transparent
				${errorMessage ? 'border-error' : ''}
			`}
					placeholder={placeholder}
					{...restProps}
				/>
			)
		}
		return (
			<InputMask
				{...restProps}
				placeholder={placeholder}
				type={type}
				mask={mask}
				alwaysShowMask={false}
				maskChar={maskChar}
				defaultValue={defaultValue}
				className={`
					rounded px-4 py-2 mt-3 focus:outline-none bg-gray-100 w-full border border-gray-300
					focus:ring-1 focus:ring-primary-blue-light focus:border-transparent
					${errorMessage ? 'border-error' : ''}`}
			/>
		)
	}

	return (
		<div className={className}>
			<label
				htmlFor={id}
				className={`${
					colorLabel || 'text-neutral-black'
				} block text-base font-medium`}
			>
				{label} {isMandatory && <span className="text-red-500">*</span>}
			</label>
			<div className="relative w-full">
				{icon && (
					<div className="absolute top-4 right-1 flex items-center px-2">
						<button
							type="button"
							className="rounded-full py-1 hover:bg-gray-300 cursor-pointer self-center flex focus:outline-none"
							onClick={handleClickIcon}
						>
							{icon}
						</button>
					</div>
				)}
				<InputMask
					{...restProps}
					placeholder={placeholder}
					type={type}
					mask={mask}
					alwaysShowMask={false}
					maskChar={maskChar}
					defaultValue={defaultValue}
					className={`
					rounded px-4 py-2 mt-3 focus:outline-none bg-gray-100 w-full border border-gray-300
					focus:ring-1 focus:ring-primary-blue-light focus:border-transparent
					${errorMessage ? 'border-error' : ''}`}
				/>

				{errorMessage && (
					<span className="text-sm text-red-500">{errorMessage}</span>
				)}
			</div>
		</div>
	)
}

export default InputDefault
