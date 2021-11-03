import { useState, DetailedHTMLProps } from 'react';
import styles from './input.module.scss';
 
const eyeOff = (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
		className="feather feather-eye-off"
	>
		<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
		<line x1="1" y1="1" x2="23" y2="23" />
	</svg>
);

const eye = (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
		className="feather feather-eye"
	>
		<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
		<circle cx="12" cy="12" r="3" />
	</svg>
);

type InputProps = {
	password?: boolean;
	value: string;
} & DetailedHTMLProps<
	React.InputHTMLAttributes<HTMLInputElement>,
	HTMLInputElement
>;

export const Input = ({ password, ...props }: InputProps) => {
	const [passwordToggled, setPasswordToggled] = useState(false);
	const visible = password ? passwordToggled : true;
	const toggle = () => setPasswordToggled(t => !t);

	let className = styles.input;
	if (props.className) className += ' ' + props.className;

	const component = (
		<input
			className={className}
			type={password && !visible ? 'password' : 'text'}
			{...props}
		/>
	);
	if (!password) return component;

	return (
		<div className={styles.wrapper}>
			<div onClick={toggle} className={styles.eye}>
				{visible ? eyeOff : eye}
			</div>
			{component}
		</div>
	);
};
