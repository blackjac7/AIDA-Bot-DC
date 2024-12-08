export function splitMessage(message, maxLength = 1500) {
  const regex = new RegExp(`.{1,${maxLength}}`, "g");
  return message.match(regex) || [];
}

export function extractQuestion(content, prefix) {
  // Jika pesan berakhir dengan prefix dan tidak ada teks setelahnya, kembalikan string kosong
  if (content.endsWith(prefix)) {
    const question = content.slice(0, -prefix.length).trim();
    return question || ""; // Mengembalikan teks sebelum prefix atau string kosong jika tidak ada teks
  }

  // Ambil teks setelah prefix jika ada
  const question = content.slice(prefix.length).trim();
  return question || ""; // Kembalikan teks jika ada, atau string kosong jika tidak ada
}
