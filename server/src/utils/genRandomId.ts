export default function genRandomId(): string {
  const randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
  const id = randLetter + Date.now();

  return id;
}
