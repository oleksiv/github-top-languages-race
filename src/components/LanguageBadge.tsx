import type React from 'react';
import {Img, staticFile} from 'remotion';
import type {LanguageId} from '../data/octoverseData';

type LanguageBadgeProps = {
  readonly id: LanguageId;
  readonly size?: number;
};

// Logos: devicon "original" SVGs in public/logos/<id>.svg
export const LanguageBadge: React.FC<LanguageBadgeProps> = ({
  id,
  size = 44,
}) => (
  <Img
    src={staticFile(`logos/${id}.svg`)}
    style={{width: size, height: size, flexShrink: 0}}
  />
);
