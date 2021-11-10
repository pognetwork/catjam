import { DetailedHTMLProps, ReactChild } from 'react';
import styles from './select.module.scss';

type SelectProps = {
	children: ReactChild;
	className?: string;
} & DetailedHTMLProps<
	React.SelectHTMLAttributes<HTMLSelectElement>,
	HTMLSelectElement
>;

export const Select = ({ children, className, ...props }: SelectProps) => (
	<select className={`${styles.select} ${className || ''}`} {...props}>
		{children}
	</select>
);
