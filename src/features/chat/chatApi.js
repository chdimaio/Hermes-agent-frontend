import { getWordCard } from "../../api/wordsApi";

export async function fetchWordCardForLemma(lemma) {
  try {
    return await getWordCard(lemma);
  } catch (err) {
    const status = err?.response?.status;
    if (status === 404) return { kind: "NOT_FOUND" };
    return { kind: "ERROR", message: "Request failed" };
  }
}