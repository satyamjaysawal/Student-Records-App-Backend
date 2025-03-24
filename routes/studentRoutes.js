const express = require('express');
const {
  getStudents,
  addStudent,
  updateStudent,
  deleteStudent,
  getMarks,
  addMark,
  deleteMark, 
} = require('../controllers/studentController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.use(authMiddleware);
router.get('/', getStudents);
router.post('/', addStudent);
router.put('/:id', updateStudent);
router.delete('/:id', deleteStudent);
router.get('/marks', getMarks);
router.post('/marks', addMark);
router.delete('/marks/:id', deleteMark); 

module.exports = router;