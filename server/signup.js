app.post('/api/signup', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      console.log('Signup request:', req.body); // Debug log
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ username, password: hashedPassword });
      await newUser.save();
  
      res.status(201).json({ message: 'User registered successfully.' });
    } catch (err) {
      console.error('Error during signup:', err.message); // Log error
      res.status(500).json({ message: 'Server error.' });
    }
  });
  