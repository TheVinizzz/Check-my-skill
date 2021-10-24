/* eslint-disable react/prop-types */
import Image from 'next/image'
import React, { FC } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
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
	rows?: number
	isMandatory?: boolean
	onChange?: any
	maxLength?: string
	colorLabel?: string
	mask?: string
	maskChar?: string | null
	defaultValue?: any
	icon?: any
	iconClick?: any
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
	maskChar = null,
	defaultValue = '',
	icon,
	rows,
	iconClick
}) => {
	const {
		control,
		formState: { errors }
	} = useFormContext()

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
				<Controller
					name={name}
					control={control}
					render={({ field }) => (
						<textarea
							{...field}
							rows={rows}
							placeholder={placeholder}
							className={`
					rounded px-4 py-2 mt-3 focus:outline-none bg-gray-100 w-full border border-gray-300
					focus:ring-1 focus:ring-primary-blue-light focus:border-transparent
					${errors[name] ? 'border-error' : ''}`}
						/>
					)}
					defaultValue={defaultValue}
				/>
			)
		}
		return (
			<Controller
				name={name}
				control={control}
				render={({ field }) => (
					<InputMask
						{...field}
						placeholder={placeholder}
						type={type}
						mask={mask}
						maskChar={maskChar}
						alwaysShowMask={false}
						className={`
					rounded px-4 py-2 mt-3 focus:outline-none bg-gray-100 w-full border border-gray-300
					focus:ring-1 focus:ring-primary-blue-light focus:border-transparent
					${errors[name] ? 'border-error' : ''}`}
					/>
				)}
				defaultValue={defaultValue}
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
				{renderField()}
				{errors[name] && (
					<span className="text-sm text-red-500">
						{errors[name].message}
					</span>
				)}
			</div>
		</div>
	)
}

export default InputDefault
