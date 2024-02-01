function getId(name) {
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);
	if (parts.length === 2) return parts.pop().split(';').shift();
}

export function setId(id, ts) {
	// 브라우저에 한달간 저장
	document.cookie = `omockId=${id}; timestamp=${ts}; path=/; max-age=2629800;`;
}

export function checkId() {
	return getId('omockId');
}

export function checkTs() {
	return getId('timestamp');
}
