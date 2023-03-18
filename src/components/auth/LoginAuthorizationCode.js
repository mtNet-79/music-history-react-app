
import use0Auth2 from "./Auth"

const LoginCode = () => {
	console.log("document.location.origin: ", document.location.origin.replace(/^http:/, 'https:'));
	const { data, loading, error, getAuth } = use0Auth2({
		authorizeUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
		clientId: '220254089568-e4d4f55nup3ulpqu8netkk6dhpghmd3l.apps.googleusercontent.com',
		redirectUri: `${document.location.origin.replace(/^http:/, 'https:')}/callback`,
		scope: '',
		responseType: 'code openid profile',
		exchangeCodeForTokenServerURL: 'https://localhost:5000',
		exchangeCodeForTokenMethod: 'POST',
		scope: 'write',
		onSuccess: (payload) => console.log('Success', payload),
		onError: (error_) => console.log('Error', error_),
	});

	const isLoggedIn = Boolean(data?.access_token); // or whatever...

	if (error) {
		return <div>Error</div>;
	}

	if (loading) {
		return <div id="authorization-code-loading">Loading...</div>;
	}

	if (isLoggedIn) {
		return <pre id="authorization-code-data">{JSON.stringify(data)}</pre>;
	}

	return (
		<button
			style={{ margin: '24px' }}
			type="button"
			id="login-with-authorization-code"
			onClick={() => getAuth()}
		>
			Login with Authorization Code
		</button>
	);
};

export default LoginCode;