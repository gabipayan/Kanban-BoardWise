import { sequelize, User } from '../db/index.js';

async function updateAdminPassword() {
  try {
    const admin = await User.findOne({ where: { username: 'admin' } });
    if (!admin) {
      console.log('Admin user not found');
      return;
    }

    await admin.setPassword('password');
    await admin.save();

    console.log('Password updated successfully');
    
    // Verify the password works
    const isValid = await admin.verifyPassword('password');
    console.log('Password verification test:', isValid ? 'SUCCESS' : 'FAILED');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await sequelize.close();
  }
}

updateAdminPassword(); 