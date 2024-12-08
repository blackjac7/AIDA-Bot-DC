import { splitMessage, extractQuestion } from "../messageHandler.js";

describe("splitMessage", () => {
  it("should split a message into chunks of 1500 characters or less", () => {
    const longMessage = "a".repeat(3000); // String tanpa spasi
    const result = splitMessage(longMessage, 1500);
    expect(result.length).toBe(2); // Harus ada 2 bagian
    expect(result[0].length).toBe(1500); // Bagian pertama panjangnya 1500 karakter
    expect(result[1].length).toBe(1500); // Bagian kedua panjangnya 1500 karakter
  });

  it("should handle messages shorter than the limit", () => {
    const shortMessage = "Hello, world!";
    const result = splitMessage(shortMessage, 1500);
    expect(result.length).toBe(1); // Harus ada 1 bagian
    expect(result[0]).toBe(shortMessage); // Bagian pertama adalah seluruh pesan
  });

  it("should return an empty array if the message is empty", () => {
    const emptyMessage = "";
    const result = splitMessage(emptyMessage, 1500);
    expect(result).toEqual([]); // Harus mengembalikan array kosong
  });

  it("should return an array with one element for a single chunk message", () => {
    const singleChunkMessage = "a".repeat(1000); // Pesan yang lebih pendek dari 1500
    const result = splitMessage(singleChunkMessage, 1500);
    expect(result.length).toBe(1); // Harus ada 1 bagian
    expect(result[0]).toBe(singleChunkMessage); // Bagian pertama adalah seluruh pesan
  });

  it("should handle a message with no spaces and still split it correctly", () => {
    const noSpaceMessage = "a".repeat(3000); // Pesan tanpa spasi
    const result = splitMessage(noSpaceMessage, 1500);
    expect(result.length).toBe(2); // Harus ada 2 bagian
    expect(result[0].length).toBe(1500); // Bagian pertama panjangnya 1500 karakter
    expect(result[1].length).toBe(1500); // Bagian kedua panjangnya 1500 karakter
  });
});

describe("extractQuestion", () => {
  it("should return the content after the prefix", () => {
    const content = "!ask What is AI?";
    const question = extractQuestion(content, "!ask");
    expect(question).toBe("What is AI?");
  });

  it("should return an empty string if there is no content after the prefix", () => {
    const content = "!ask";
    const question = extractQuestion(content, "!ask");
    expect(question).toBe(""); // Tidak ada konten setelah prefix
  });

  it("should trim any leading or trailing spaces", () => {
    const content = "!ask    What is AI?   ";
    const question = extractQuestion(content, "!ask");
    expect(question).toBe("What is AI?");
  });

  it("should return an empty string if there is only space after the prefix", () => {
    const content = "!ask "; // Hanya spasi setelah prefix
    const question = extractQuestion(content, "!ask");
    expect(question).toBe(""); // Harus mengembalikan string kosong
  });

  it("should return an empty string if prefix is at the end of the message", () => {
    const content = "What is AI? !ask"; // Prefix ada di akhir string
    const question = extractQuestion(content, "!ask");
    expect(question).toBe("What is AI?"); // Harus mengembalikan string kosong karena tidak ada konten setelah prefix
  });

  // Pastikan fungsi mengembalikan pertanyaan jika ada teks setelah prefix
  it("should return the question if content contains text after the prefix", () => {
    const content = "What is AI? !ask";
    const question = extractQuestion(content, "!ask");
    expect(question).toBe("What is AI?"); // Harus mengembalikan teks sebelum prefix
  });

  // Kasus ketika ada spasi setelah prefix
  it("should return an empty string if there is no content after the prefix and only space exists", () => {
    const content = "!ask "; // Hanya spasi setelah prefix
    const question = extractQuestion(content, "!ask");
    expect(question).toBe(""); // Harus mengembalikan string kosong
  });
});
