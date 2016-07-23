function toggleSignIn(){
	if(firebase.auth().currentUser){
		firebase.auth().signOut();
	} else {
		var email = document.getElementById('email').value;
		var password = document.getElementById('password').value;
		if(email.length < 4) {
			alert('Please enter an email address.');
			return;
		}
		if(password.length < 4){
			alert('Please enter a valid password.');
			return;
		}
		firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error){

			var errorCode = error.code;
			var errorMessage = error.message;

			if(errorCode === 'auth/wrong-password'){
				alert('Wrong Password');
			} else {
				alert(errorMessage);
			}
			console.log(error);
			document.getElementById('sign-in').disabled = false;
		});
		document.getElementById('sign-in').disabled = true;
	}
}

function handleSignUp(){
	var email = document.getElementById('email').value;
	var password = document.getElementById('password').value;

	if(email.length < 4) {
		alert('Please enter a valid email address.');
		return;
	}
	if(password.length < 4) {
		alert('Your password must be at least 5 characters.');
		return;
	}

	firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error){
		var errorCode = error.code;
		var errorMessage = error.message;

		if (errorCode == 'auth/weak-password') {
			alert('The password is too weak.');
		} else {
			alert(errorMessage);
		}
		console.log(errorCode);
	});
}

function emailVerification(){
	firebase.auth().currentUser.sendEmailVerification().then(function(){
		console.log('Email Sent!');
	});
}

function initApp(){
	firebase.auth().onAuthStateChanged(function(user){
		document.getElementById('verify-email').disabled = true;
		if(user){
			var displayName = user.displayName;
			var email = user.email;
			var emailVerified = user.emailVerified;
			var photoURL = user.photoURL;
			var isAnonymous = user.isAnonymous;
			var uid = user.uid;
			var refreshToken = user.refreshToken;
			var providerData = user.providerData;

			document.getElementById('sign-in-status').textContent = 'Signed in';
			document.getElementById('sign-in').textContent = 'Sign out';

			document.getElementById('account-details').textContent = JSON.stringify({
				displayName: displayName,
				email: email,
				emailVerified: emailVerified,
				photoURL: photoURL,
				isAnonymous: isAnonymous,
				uid: uid,
				refreshToken: refreshToken,
				providerData: providerData
			}, null, ' ');
			if(!emailVerified) {
				document.getElementById('verify-email').disabled = false;
			}
		} else {
			document.getElementById('sign-in-status').textContent = 'Signed out';
			document.getElementById('sign-in').textContent = 'Sign in';

			document.getElementById('account-details').textContent = 'null';	
		}
		document.getElementById('sign-in').disabled = false;
	}); //onAuthStateChanged

	document.getElementById('sign-in').addEventListener('click', toggleSignIn, false);

	document.getElementById('sign-up').addEventListener('click', handleSignUp, false);

	document.getElementById('verify-email').addEventListener('click', emailVerification, false);

}

window.onload = function(){
	initApp();
};