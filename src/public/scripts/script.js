var instance = axios.create({
	baseURL: 'http://localhost:3000/',
	timeout: 3 * 1000,
	headers: {
		'Content-Type': 'application/json;charset=utf-8',
		'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
	},
});

// Xu ly data trước khi request xuống server
instance.interceptors.request.use(
	async (config) => {
		// bắt req.headers ở server -> thành viết thường hết
		config.headers['Access-Control-Allow-Origin'] = '*';
		if (config.url.indexOf('/auth/login') >= 0) {
			return config;
		}
		return config;
	},
	(err) => {
		console.log('***************** Lỗi ở request');
		return Promise.reject(err);
	},
);

instance.setCookie = async (cname, cvalue, exdays) => {
	const d = new Date();
	d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
	let expires = 'expires=' + d.toUTCString();
	document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
};

instance.getCookie = (cname) => {
	let name = cname + '=';
	let decodedCookie = decodeURIComponent(document.cookie);
	let ca = decodedCookie.split(';');
	for (let i = 0; i < ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return '';
};

// #CHECK ĐĂNG NHẬP
if (window.location.pathname !== '/auth/login' && !instance.getCookie('tai khoan')) {
	window.location.replace('/auth/login');
}

instance.deleteAllCookie = () => {
	var cookies = document.cookie.split(';');
	for (var i = 0; i < cookies.length; i++) {
		var cookie = cookies[i];
		var eqPos = cookie.indexOf('=');
		var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
		document.cookie =
			name + '=;expires=' + new Date().toUTCString() + ';path=/';
	}
};
(function($) {
	$(document).ready(function() {
	   // get current URL path and assign 'active' class
	   var pathname = window.location.pathname;
	   $('.nav.navbar-nav > li > a[href="'+pathname+'"]').parent().addClass('active');
   });
 })

//@ API FUNCT
// instance.getNhanVienbyId = async (manv) => {
// 	return (await instance.post(`/${manv}`)).data;
// }
