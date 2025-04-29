import * as bcrypt from 'bcrypt';

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt();

  return bcrypt.hash(password, salt);
}

// "Gambi para criar um usuario na base."
// async function main() {
//   const result = await hashPassword('123456');

//   console.log(result);
// }
