app.post('/register', async (req, res) => {


    const { name, email, password } = req.body;
  
    try {
      const userDoc = await User.create({
        name,
        email,
        password,
      });
      res.json(userDoc);
    } catch (e) {
      res.status(422).json(e);
    }
  
  });