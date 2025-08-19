const express = require('express');
const router = express.Router();
// const {protect}  = require( "../middleware/authMiddleware");
const {createFile , getFile , updateFile , deleteFile} =require( "../controllers/fileController");

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


router.post('/',auth ,createFile);
router.get('/', auth, getFile);
router.get('/:id', auth, getFile);
router.put('/:id', auth, updateFile);
router.delete('/:id', auth, deleteFile);

module.exports = router;