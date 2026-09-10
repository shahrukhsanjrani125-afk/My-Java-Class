const jwt = require('jsonwebtoken');
const QRCode = require('qrcode');
const QrToken = require('../models/QrToken');

exports.generateQrPayload = async (classId, type) => {
  const token = require('crypto').randomBytes(16).toString('hex');
  const expiresAt = new Date(Date.now() + process.env.QR_TOKEN_EXPIRE * 1000);

  await QrToken.create({ token, classId, type, used: false, expiresAt });

  const payload = {
    token,
    classId,
    type,
    timestamp: Date.now()
  };

  const signedPayload = jwt.sign(payload, process.env.QR_SECRET, { expiresIn: process.env.QR_TOKEN_EXPIRE });
  return { token, payload: signedPayload };
};

exports.generateQrCode = async (payload) => {
  return await QRCode.toDataURL(payload);
};
