import { httpClient } from "./httpClient";

export async function getWordCard(lemma) {
  const res = await httpClient.get("/v1/words/card", {
    params: { lemma },
  });
  return res.data;
}