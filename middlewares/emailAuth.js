const CryptoJS = require("crypto-js");

module.exports = (req, res, next) => {
    try {
        const cronCipherText = req.headers["cron-cipher-text"];

        if (!cronCipherText) {
            return res.status(401).json({ message: "Unauthenticated User" });
        }

        const originalText = CryptoJS.AES.decrypt(
            cronCipherText,
            process.env.CRON_JOBS_KEY
        ).toString(CryptoJS.enc.Utf8);

        if (originalText === process.env.CRON_ORIGINAL_TEXT) {
            return next();
        }

        return res.status(401).json({ message: "Unauthenticated User" });
    } catch (err) {
        return res.status(err?.statusCode || 500).json({ error: err });
    }
};
