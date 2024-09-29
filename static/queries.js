async function signup(event){
	const emailUser = document.getElementById('emailInput').value;
	const firstName = document.getElementById('firstName').value;
	const lastName = document.getElementById('lastName').value;
	const passwordUser = document.getElementById('passInput').value;
	const passwordConfirm = document.getElementById('passConInput').value;
	const errorMessage = document.getElementById('error-message');


	if (!emailUser || !firstName || !lastName || !passwordUser || !passwordConfirm) {
		errorMessage.style.display = 'block';
		errorMessage.innerHTML = "Please fill out all fields.";
		return false;
	}

	if (passwordUser !== passwordConfirm) {
		errorMessage.style.display = 'block';
		errorMessage.innerHTML = "Passwords do not match.";
		return false;
	}

	const newUser = {
		email: emailUser,
		first_name: firstName,
		last_name: lastName,
		password: passwordUser
	};

	try {
		const response = await fetch('http://127.0.0.1:5000/auth/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(newUser)
		});

		if (response.ok) {
			errorMessage.style.display = 'none';
			console.log('Registration successful');
			window.location.href = "verify";
		} else {
			const errorData = await response.json();
			errorMessage.style.display = 'block';
			errorMessage.textContent = errorData.message;
		}
	} catch (error) {
		console.error('Error connecting to server', error);
		errorMessage.style.display = 'block';
		errorMessage.textContent = 'Error connecting to the server.';
	}

	console.log(JSON.stringify(newUser));
}

async function signin(){
	const display = document.getElementById('message').value;
	const passInput = document.getElementById('passInput').value;
	const emailInput = document.getElementById('emailInput').value;

	if (!emailInput || !passInput) {
		message.style.display = 'block';
		message.textContent = "Please fill out both the email and password fields.";
		return false;
	}

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
			message.style.display = 'none';
			alert('Login successful!');
			console.log('Login successful!');
		} 
		else {
			const errorData = await response.json();
			message.style.display = 'block';
			console.log(errorData.message);
			message.textContent = errorData.message;
		}

	} 
	catch (error) {
		console.error('Error during login:', error);
		message.style.display = 'block';
		message.textContent = 'Error connecting to the server.';
	}
}
