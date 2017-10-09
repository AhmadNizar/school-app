const crypto = require('crypto');

module.exports = function enkrip(password, key){
	
	const hash = crypto.createHmac("sha256", key)
                   .update(password)
                   .digest('hex');

    return hash
}