interface PropTypes {
	name: string;
	id: string;
	options: string[];
	className?: string;
	optionClassName?: string;
	value?: string | number | readonly string[] | undefined;
	onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function Select({
	name,
	id,
	options,
	className,
	optionClassName,
	value,
	onChange,
}: PropTypes) {
	return (
		<>
			<select
				name={name}
				id={id}
				onChange={onChange}
				className={className && className}
				value={value}
			>
				{options.map((value, index) => {
					return (
						<option
							key={index}
							value={value}
							className={optionClassName}
						>
							{value}
						</option>
					);
				})}
			</select>
		</>
	);
}
