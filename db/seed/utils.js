const generateRandomString = (length) => {
            let randomString = "";
            let stringLength = 0;
            const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            while (stringLength < length) {
                randomString += characters.charAt(Math.floor(Math.random() * characters.length));
                stringLength ++;
            }
            return randomString
        }

module.exports = generateRandomString