import { BOX_ID_LENGTH, UNAMBIGUOUS_LETTERS } from "./constants";

export default function getRandomBoxId() {
  const randomLetters = [];

  for (let i = 0; i < BOX_ID_LENGTH; i++) {
    const randomIndex = Math.floor(Math.random() * UNAMBIGUOUS_LETTERS.length);
    randomLetters.push(UNAMBIGUOUS_LETTERS[randomIndex]);
  }

  return randomLetters.join("");
}
