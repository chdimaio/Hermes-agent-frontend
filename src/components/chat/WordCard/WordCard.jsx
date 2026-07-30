import React from "react";
import "./WordCard.scss";

export default function WordCard({ card }) {
  if (!card) return null;

  const { lemma, definition, translationEs, synonyms = [] } = card;

  return (
    <section className="wordCard" aria-label={`Word card for ${lemma}`}>
      <div className="wordCard__glass">
        <header className="wordCard__header">
          <div className="wordCard__titleBlock">
            <span className="wordCard__label">Word</span>
            <h2 className="wordCard__lemma">{lemma}</h2>
          </div>

          <div className="wordCard__esPill" aria-label="Spanish translation">
            <div className="wordCard__esPillLabel">SPANISH</div>
            <div className="wordCard__esPillValue">{translationEs}</div>
          </div>
        </header>

        <div className="wordCard__rows">
          <div className="wordCard__row">
            <div className="wordCard__rowLabel">Definition</div>
            <div className="wordCard__rowValue">{definition}</div>
          </div>

          <div className="wordCard__row">
            <div className="wordCard__rowLabel">Synonyms</div>

            {synonyms.length ? (
              <ul className="wordCard__synList">
                {synonyms.map((s, idx) => (
                  <li key={s.id ?? idx} className="wordCard__synItem">
                    {s.lemma ?? s}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="wordCard__muted">
                No synonyms found in the database.
              </div>
            )}
          </div>
        </div>

        <div className="wordCard__footerDivider" />
      </div>
    </section>
  );
}
