async function signup(event){
	const emailUser = document.getElementById('emailInput').value;
	const firstName = document.getElementById('firstName').value;
	const lastName = document.getElementById('lastName').value;
	const passwordUser = document.getElementById('passInput').value;
	const passwordConfirm = document.getElementById('passConInput').value;
	const errorMessage = document.getElementById('error-message');

	if(passwordUser !== passwordConfirm){
		errorMessage.style.display = 'block';
		return;
	}
	else {
		errorMessage.style.display = 'none';
	}

	const newUser = {
		email: emailUser,
		first_name: firstName,
		last_name: lastName,
		password: passwordUser
	};
	
	try{
		const response = await fetch('http://127.0.0.1:5000/auth/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(newUser)
		});

		if(response.ok) {
			console.log('Registration good');
		}
		else {
			const errorData = await response.json();
			alert('Error: ${errorData.message}');
		}
	}
	catch(error) {
		console.error('Error connecting to server', error);
	}

	const userQuery = JSON.stringify(newUser);

	console.log(userQuery);
}

async function signin(){
	const passInput = document.getElementById('passInput').value;
	const emailInput = document.getElementById('emailInput').value;
	const errorMessage = document.getElementById('errorMessage').value;

	try {
		const response = await fetch('http://127.0.0.1:5000/auth/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			
			body: JSON.stringify({
				email: emailInput,
				password: passInput
			})
		});

		if (response.ok) {
			console.log('Login successful!');
		} 
		else {
			errorMessage.style.display = 'block';
		}

	} 
	catch (error) {
		console.error('Error during login:', error);
	}
}
