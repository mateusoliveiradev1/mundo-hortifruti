const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const multer = require('multer');
require('dotenv').config();

const app = express();
app.use(express.json());

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_KEY in environment');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const upload = multer({ storage: multer.memoryStorage() });

app.post('/api/usuarios', async (req, res) => {
  const { email, password, ...metadata } = req.body;
  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    user_metadata: metadata,
  });
  if (error) return res.status(400).json({ error: error.message });
  res.json({ user: data.user });
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

app.put('/api/editar-perfil', async (req, res) => {
  const { id, ...attributes } = req.body;
  const { data, error } = await supabase.auth.admin.updateUserById(id, {
    user_metadata: attributes,
  });
  if (error) return res.status(400).json({ error: error.message });
  res.json({ user: data.user });
});

app.post('/api/upload', upload.single('file'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  const fileName = `${Date.now()}-${req.file.originalname}`;
  const { data, error } = await supabase.storage
    .from('uploads')
    .upload(fileName, req.file.buffer, { contentType: req.file.mimetype });
  if (error) return res.status(400).json({ error: error.message });
  res.json({ path: data.path });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
