

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

}

window.onload = function(){
	initApp();
};