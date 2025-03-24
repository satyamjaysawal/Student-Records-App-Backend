const db = require('../models/db');

exports.getStudents = async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM students');
    res.json(rows);
  } catch (err) {
    console.error('Get students error:', err);
    res.status(500).json({ message: 'Database error', error: err.message });
  }
};

exports.addStudent = async (req, res) => {
  const { name, dob, mobile, email } = req.body;
  try {
    await db.query('INSERT INTO students (name, dob, mobile, email) VALUES ($1, $2, $3, $4)', 
      [name, dob, mobile, email]);
    res.status(201).json({ message: 'Student added' });
  } catch (err) {
    console.error('Add student error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.updateStudent = async (req, res) => {
  const { id } = req.params;
  const { name, dob, mobile, email } = req.body;
  try {
    await db.query('UPDATE students SET name = $1, dob = $2, mobile = $3, email = $4 WHERE id = $5', 
      [name, dob, mobile, email, id]);
    res.json({ message: 'Student updated' });
  } catch (err) {
    console.error('Update student error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.deleteStudent = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM students WHERE id = $1', [id]);
    res.json({ message: 'Student deleted' });
  } catch (err) {
    console.error('Delete student error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getMarks = async (req, res) => {
  try {
    const { rows } = await db.query(`
      SELECT s.id AS student_id, s.name, m.id AS mark_id, m.semester_id, m.subject_name, m.marks_obtained, m.total_marks
      FROM students s
      LEFT JOIN marks m ON s.id = m.student_id
    `);
    res.json(rows);
  } catch (err) {
    console.error('Get marks error:', err);
    res.status(500).json({ message: 'Database error', error: err.message });
  }
};

exports.addMark = async (req, res) => {
  const { student_id, semester_id, subject_name, marks_obtained, total_marks = 100 } = req.body;
  try {
    await db.query('INSERT INTO marks (student_id, semester_id, subject_name, marks_obtained, total_marks) VALUES ($1, $2, $3, $4, $5)', 
      [student_id, semester_id, subject_name, marks_obtained, total_marks]);
    res.status(201).json({ message: 'Mark added' });
  } catch (err) {
    console.error('Add mark error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.deleteMark = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM marks WHERE id = $1', [id]);
    res.json({ message: 'Mark deleted' });
  } catch (err) {
    console.error('Delete mark error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};