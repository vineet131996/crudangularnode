const db = require('../config/db');

exports.getAllEmployees = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM employees');
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching employees', error: error.message });
    }
};

exports.getEmployeeById = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM employees WHERE id = ?', [req.params.id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching employee', error: error.message });
    }
};

exports.createEmployee = async (req, res) => {
    const { name, email, designation, salary } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO employees (name, email, designation, salary) VALUES (?, ?, ?, ?)',
            [name, email, designation, salary]
        );
        res.status(201).json({ id: result.insertId, name, email, designation, salary });
    } catch (error) {
        res.status(500).json({ message: 'Error creating employee', error: error.message });
    }
};

exports.updateEmployee = async (req, res) => {
    const { name, email, designation, salary } = req.body;
    try {
        const [result] = await db.query(
            'UPDATE employees SET name = ?, email = ?, designation = ?, salary = ? WHERE id = ?',
            [name, email, designation, salary, req.params.id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json({ message: 'Employee updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating employee', error: error.message });
    }
};

exports.deleteEmployee = async (req, res) => {
    try {
        const [result] = await db.query('DELETE FROM employees WHERE id = ?', [req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting employee', error: error.message });
    }
};
