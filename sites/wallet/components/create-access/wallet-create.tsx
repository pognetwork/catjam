import { ChangeEvent, useEffect, useState } from 'react';
import { Input } from '../../../../components/input';
import styles from './wallet-create.module.scss';
import buttonStyles from './../../../../components/button.module.scss';
import { spinner } from '../../../../assets/icons';
import { Wallet } from 'champ-wasm';
import { storeAsFile } from '../../../../utils/store-as-file';
import { useWallet } from '../../state';
import { useLocation } from '@snowstorm/core';

type STEPS = 'PASSWORD' | 'DOWNLOAD' | 'DONE';

export const WalletCreate = () => {
	const ctx = useWallet();
	const [, setLocation] = useLocation();

	const [error, setError] = useState<false | unknown>(false);
	const [step, setStep] = useState<STEPS>('PASSWORD');

	// STEP: PASSWORD
	const [password, setPassword] = useState('');
	const [passwordConfirmation, setPasswordConfirmation] = useState('');
	const passwordMatches = password === passwordConfirmation;
	const passwordValid = password.length > 10;
	const [wallet, setWallet] = useState<Wallet | undefined>();

	const generateWallet = password => {
		try {
			const w = Wallet.generateJSON(password);
			setWallet(w);
			setStep('DOWNLOAD');
			console.log('set step to download');
		} catch (error: unknown) {
			console.error(error);
			setError(error);
			return false;
		}

		return true;
	};

	// STEP: DOWNLOAD
	const [downloadReady, setDownloadReady] = useState(false);
	const [downloadedWallet, setDownloadedWallet] = useState(false);
	const downloadWallet = () => {
		storeAsFile(wallet.json, `pog-${wallet.address}.json`, 'application/json');
		setDownloadedWallet(true);
	};

	// STEP: DONE
	const [decryptionPassword, setDecryptionPassword] = useState('');
	const decryptWallet = () => {
		wallet.unlock(decryptionPassword);
		ctx.currentWallet = wallet;
		setLocation('/dashboard');
	};

	useEffect(() => {
		if (step !== 'DOWNLOAD') return;
		// we wait a second since it just "feels" to fast otherwise
		const timeout = setTimeout(() => setDownloadReady(true), 1000);
		return () => clearTimeout(timeout);
	}, [step]);

	const onChange =
		(func: (str: string) => void) => (e: ChangeEvent<HTMLInputElement>) =>
			func(e.target.value);

	if (!ctx.wasmReady) {
		return <div>{spinner}</div>;
	}

	return (
		<div className={styles.wrapper}>
			<h1>Create a new Wallet File</h1>
			<Steps step={step} />
			{step === 'DOWNLOAD' && !error && (
				<div className={styles.download}>
					{downloadReady ? (
						<>
							<h3>
								Never share this file with anyone! This is the only way to
								recover your funds, so be sure to keep it secure.
							</h3>
							<div>
								<button
									className={buttonStyles.button}
									type="button"
									onClick={downloadWallet}
								>
									Download Encrypted Wallet File
								</button>
								<button
									className={buttonStyles.button}
									type="button"
									onClick={() => setStep('DONE')}
									disabled={!downloadedWallet}
								>
									Continue
								</button>
							</div>
						</>
					) : (
						<>
							{spinner}
							<h2>Generating Wallet...</h2>
						</>
					)}
				</div>
			)}

			{step === 'PASSWORD' && !error && (
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
						onClick={() => generateWallet(password)}
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

			{step === 'DONE' && !error && (
				<div>
					<h2>You're done!</h2>
					<p>
						Please re-enter the password you chose earlier to access your
						wallet.{' '}
					</p>
					<Input
						password
						value={decryptionPassword}
						onChange={onChange(setDecryptionPassword)}
						placeholder="Enter Password"
					/>
					<button
						onClick={decryptWallet}
						className={buttonStyles.button}
						type="button"
					>
						Decrypt Wallet
					</button>
				</div>
			)}

			{error && (
				<div>
					<h1>An unknown error occured. Sorry :( </h1>
				</div>
			)}
		</div>
	);
};

const Steps = ({ step }: { step: STEPS }) => (
	<div className={styles.steps}>
		<div className={(step === 'PASSWORD' && styles.active) || undefined}>
			<div>1</div>
			<p>Step 1. Create password</p>
		</div>
		<div className={(step === 'DOWNLOAD' && styles.active) || undefined}>
			<div>2</div>
			<p>Step 2. Download Wallet File</p>
		</div>
		<div className={(step === 'DONE' && styles.active) || undefined}>
			<div>3</div>
			<p>Step 3. Verify Wallet</p>
		</div>
	</div>
);
