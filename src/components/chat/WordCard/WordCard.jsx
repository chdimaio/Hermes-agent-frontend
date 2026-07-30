import React from "react";
import "./WordCard.scss";

export default function WordCard({ card }) {
  if (!card) return null;

  const { lemma, definition, translationEs, synonyms = [] } = card;

  return (
    <section className="wordCard" aria-label={`Word card for ${lemma}`}>
      <header className="wordCard__header">
        <div className="wordCard__lemmaWrap">
          <span className="wordCard__label">Word</span>
          <h2 className="wordCard__lemma">{lemma}</h2>
        </div>
      </header>

      <div className="wordCard__body">
        <div className="wordCard__row">
          <span className="wordCard__tag">Definition</span>
          <p className="wordCard__text">{definition}</p>
        </div>

        <div className="wordCard__row">
          <span className="wordCard__tag">Spanish</span>
          <p className="wordCard__text">{translationEs}</p>
        </div>

        <div className="wordCard__row">
          <span className="wordCard__tag">Synonyms</span>
          {synonyms.length ? (
            <ul className="wordCard__synList">
              {synonyms.map((s, idx) => (
                <li key={s.id ?? idx} className="wordCard__synItem">
                  {s.lemma ?? s}
                </li>
              ))}
            </ul>
          ) : (
            <p className="wordCard__muted">No synonyms found in the database.</p>
          )}
        </div>
      </div>
    </section>
  );
}
