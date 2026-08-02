const express = require('express');
const Transaction = require('../models/Transaction');
const auth = require('../middleware/auth');
const PDFDocument = require('pdfkit');
const router = express.Router();

// Add
router.post('/', auth, async (req, res) => {
  try {
    const { title, amount, type, category, date } = req.body;
    const transaction = new Transaction({ user: req.user.id, title, amount, type, category, date });
    await transaction.save();
    res.status(201).json(transaction);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Get all (with filters)
router.get('/', auth, async (req, res) => {
  try {
    let filter = { user: req.user.id };
    if (req.query.category) filter.category = req.query.category;
    if (req.query.startDate) filter.date = { $gte: new Date(req.query.startDate) };
    if (req.query.endDate) filter.date = { ...filter.date, $lte: new Date(req.query.endDate) };
    const transactions = await Transaction.find(filter).sort({ date: -1 });
    res.json(transactions);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Summary for Charts
router.get('/summary', auth, async (req, res) => {
  try {
    const matchStage = { user: req.user.id };
    const result = await Transaction.aggregate([
      { $match: matchStage },
      { $group: { _id: { type: '$type', category: '$category' }, total: { $sum: '$amount' } } },
      { $group: { _id: '$_id.type', items: { $push: { category: '$_id.category', total: '$total' } }, totalSum: { $sum: '$total' } } }
    ]);
    res.json(result);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Delete
router.delete('/:id', auth, async (req, res) => {
  try {
    await Transaction.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    res.json({ msg: 'Deleted' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// PDF Download
router.get('/download-pdf', auth, async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id }).sort({ date: -1 });
    const doc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=FinTrack_Report.pdf');
    doc.pipe(res);
    doc.fontSize(20).text('FinTrack - Report', { align: 'center' });
    doc.moveDown();
    transactions.forEach(t => {
      doc.fontSize(12).text(`${t.date.toLocaleDateString()} | ${t.title} | ${t.type} | $${t.amount}`);
    });
    doc.end();
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;