import bcrypt from 'bcrypt';

async function generateHash() {
  const password = 'password';
  const saltRounds = 10;
  
  try {
    const hash = await bcrypt.hash(password, saltRounds);
    console.log('Generated hash:', hash);
    
    // Verify the hash works
    const isValid = await bcrypt.compare(password, hash);
    console.log('Verification test:', isValid ? 'SUCCESS' : 'FAILED');
  } catch (error) {
    console.error('Error:', error);
  }
}

generateHash(); 