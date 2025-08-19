const express = require("express");
const router = express.Router();
// const { protect } = require("../middleware/authMiddleware");
const { createWorkspace, getWorkspace, updateWorkspace, deleteWorkspace } = require( "../controllers/workspaceController");
function auth(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  if (!token) return res.status(401).json({ msg: 'No token provided' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id };
    next();
  } catch (err) {
    return res.status(401).json({ msg: 'Invalid token' });
  }
}

router.post('/', auth, createWorkspace);
router.get('/:id', auth, getWorkspace);
router.put('/:id', auth, updateWorkspace);
router.delete('/:id', auth, deleteWorkspace);

module.exports = router;