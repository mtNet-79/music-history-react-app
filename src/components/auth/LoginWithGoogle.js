import use0Auth2 from './Auth';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const LoginWithGoogle = ({ redirectedFrom }) => {
	// const navigate = useNavigate();
	// const dispatch = useDispatch();

	console.log("document.location.origin: ", document.location.origin.replace(/^http:/, 'https:'));
	// const onSuccess = (payload) => {
	// 	console.log('Success', payload);
	// 	// Assuming the user's ID is available in the payload.
	// 	// Modify this line if the user ID is stored differently in the payload.
	// 	const userId = payload.user_id;
	// 	dispatch(setAuthedUser(userId));
	// 	redirectedFrom ? navigate(redirectedFrom) : navigate('/');
	//   };

	const { getAuth } = use0Auth2({
		authorizeUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
		clientId: clientId,
		redirectUri: `${document.location.origin.replace(/^http:/, 'https:')}/callback`,
		scope: 'email profile',
		responseType: 'code',
		exchangeCodeForTokenServerURL: 'https://localhost:5001/auth/google/token',
		exchangeCodeForTokenMethod: 'POST',
		redirectedFrom,
	});
	// console.log("data :", data)

	// if (error) {
	// 	return <div>Error</div>;
	// }

	// if (loading) {
	// 	return <div>Loading...</div>;
	// }

	return (
		<button
			style={{ margin: '24px' }}
			type="button"
			id="login-with-authorization-code"
			onClick={() => getAuth()}
		>
			Login with Google
		</button>
	);
};

export default LoginWithGoogle;