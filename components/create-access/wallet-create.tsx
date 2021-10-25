import { ChangeEvent, useState } from 'react';
import { Input } from '../input';
import styles from './wallet-create.module.scss';
import buttonStyles from './../button.module.scss';

type STEPS = 'PASSWORD' | 'DOWNLOAD' | 'DONE';

export const WalletCreate = () => {
	const [step, _setStep] = useState<STEPS>('PASSWORD');
	const setStep = (step: STEPS) => () => _setStep(step);

	const [password, setPassword] = useState('');
	const [passwordConfirmation, setPasswordConfirmation] = useState('');

	const onChange =
		(func: (str: string) => void) => (e: ChangeEvent<HTMLInputElement>) =>
			func(e.target.value);

	const passwordMatches = password === passwordConfirmation;
	const passwordValid = password.length > 10;

	return (
		<div className={styles.wrapper}>
			<h1>Create a new Wallet File</h1>
			<Steps step={step} />
			{step === 'PASSWORD' && (
				<div>
					<h2>Create a password</h2>
					<p>
						Remember this password and ideally save it to your password manager.
						You won't be able to access your funds without it.{' '}
					</p>
					<Input
						password
						value={password}
						onChange={onChange(setPassword)}
						placeholder="Enter Password"
					/>
					<Input
						password
						onChange={onChange(setPasswordConfirmation)}
						value={passwordConfirmation}
						placeholder="Confirm Password"
					/>
					<button
						className={buttonStyles.button}
						type="button"
						onClick={setStep('DOWNLOAD')}
						disabled={!passwordMatches || !passwordValid}
					>
						Continue
						{!passwordValid &&
							passwordMatches &&
							' (Your Password is too insecure)'}
						{!passwordMatches && " (Your Passwords don't match)"}
					</button>
				</div>
			)}
		</div>
	);
};

const Steps = ({ step }: { step: STEPS }) => (
	<div className={styles.steps}>
		<div className={step === 'PASSWORD' && styles.active}>
			<div>1</div>
			<p>Step 1. Create password</p>
		</div>
		<div className={step === 'DOWNLOAD' && styles.active}>
			<div>2</div>
			<p>Step 2. Download Wallet File</p>
		</div>
		<div className={step === 'DONE' && styles.active}>
			<div>3</div>
			<p>Step 3. Verify Wallet</p>
		</div>
	</div>
);
