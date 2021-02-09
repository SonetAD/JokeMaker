let jokeBtn = document.querySelector('.jokebtn');
let jokeBody = document.querySelector('.jokebody');

jokeBtn.addEventListener('click', getTheJoke);

function sendReq(method, url) {
	return new Promise((resolve, reject) => {
		let xhr = new XMLHttpRequest();
		xhr.open(method, url);
		xhr.responseType = 'json';
		xhr.setRequestHeader('Accept', 'application/json');
		xhr.send();

		xhr.onload = () => {
			if (xhr.status <= 400) {
				resolve(xhr.response);
			} else {
				reject(xhr.response);
			}
		};

		xhr.onerror = () => {
			reject('No network connection.');
		};
	});
}

function getTheJoke(e) {
	document.querySelector('img').style.display = 'block';
	jokeBody.style.display = 'none';
	setTimeout(() => {
		document.querySelector('img').style.display = 'none';
		jokeBody.style.display = 'block';
	}, 500);
	sendReq('GET', ' https://icanhazdadjoke.com/')
		.then((res) => {
			jokeBody.textContent = res.joke;
		})
		.catch((err) => {
			jokeBody.textContent = err;
			jokeBody.style.color = 'red';
		});
	e.preventDefault();
}
