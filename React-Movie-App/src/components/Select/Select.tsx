interface PropTypes {
	name: string;
	id: string;
	options: string[];
	className?: string;
	onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function Select({ name, id, options, className, onChange }: PropTypes) {
	return (
		<>
			<select name={name} id={id} onChange={onChange} className={className && className}>
				{options.map((value, index) => {
					return <option key={index} value={value}>{value}</option>;
				})}
			</select>
		</>
	);
}
