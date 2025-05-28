import bcrypt from 'bcrypt';
import { sequelize, User } from '../db/index.js';

async function updatePassword() {
  try {
    // Generate a fresh hash for 'password'
    const password = 'password';
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    console.log('Generated hash:', hashedPassword);

    // Update the admin user's password
    const [updatedCount] = await User.update(
      { password: hashedPassword },
      { where: { username: 'admin' } }
    );

    if (updatedCount === 0) {
      console.log('No admin user found');
    } else {
      console.log('Password updated successfully');
    }

    // Verify the password works
    const admin = await User.findOne({ where: { username: 'admin' } });
    if (admin) {
      const isValid = await bcrypt.compare('password', admin.password);
      console.log('Password verification test:', isValid ? 'SUCCESS' : 'FAILED');
    }

    process.exit(0);
  } catch (error) {
    console.error('Error updating password:', error);
    process.exit(1);
  }
}

// Run the update
updatePassword(); 