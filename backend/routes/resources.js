const express = require('express');
const router  = express.Router();
const Resource = require('../models/Resource');
const authMiddleware = require('../middleware/auth');

// ── GET all resources (public) ────────────────────────────────
router.get('/', async (req, res) => {
  try {
    const resources = await Resource.find().sort({ createdAt: -1 });
    res.json(resources);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// ── GET single resource by ID (public) ───────────────────────
router.get('/:id', async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) return res.status(404).json({ message: 'Resource not found' });
    res.json(resource);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// ── POST add new resource (protected — must be logged in) ─────
router.post('/', authMiddleware, async (req, res) => {
  const { title, link, description, category } = req.body;

  if (!title || !link || !description) {
    return res.status(400).json({ message: 'title, link, and description are required.' });
  }

  // Basic URL validation
  try { new URL(link); } catch {
    return res.status(400).json({ message: 'Please provide a valid URL (include https://).' });
  }

  try {
    const resource = new Resource({
      title:       title.trim(),
      link:        link.trim(),
      description: description.trim(),
      category:    category || 'General',
      addedBy:     req.user.id
    });
    await resource.save();
    res.status(201).json({ message: 'Resource added!', resource });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// ── DELETE resource (protected — owner or admin) ──────────────
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) return res.status(404).json({ message: 'Resource not found' });

    // Only the user who added it can delete it
    if (resource.addedBy && resource.addedBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this resource.' });
    }

    await resource.deleteOne();
    res.json({ message: 'Resource deleted.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;