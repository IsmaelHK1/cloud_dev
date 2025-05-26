import { Question } from '@/types';

export const questionsDB: Question[] = [
  {
    id: 1,
    question: "Comment te sens-tu aujourd'hui ?",
    keywords: ["sentiment", "humeur", "aujourd'hui"],
    expectedPositive: ["bien", "heureux", "content", "super", "génial", "parfait"],
    expectedNegative: ["mal", "triste", "fatigué", "stressé", "énervé", "difficile"]
  },
  {
    id: 2,
    question: "As-tu bien dormi cette nuit ?",
    keywords: ["sommeil", "dormir", "nuit", "repos"],
    expectedPositive: ["oui", "bien", "parfaitement", "reposé", "excellemment"],
    expectedNegative: ["non", "mal", "insomnie", "réveillé", "difficile", "peu"]
  },
  {
    id: 3,
    question: "Comment s'est passée ta journée ?",
    keywords: ["journée", "travail", "activité"],
    expectedPositive: ["bien", "super", "productive", "géniale", "parfaite"],
    expectedNegative: ["difficile", "compliquée", "stressante", "longue", "fatigante"]
  },
  {
    id: 4,
    question: "Qu'est-ce qui te préoccupe en ce moment ?",
    keywords: ["préoccupation", "souci", "problème", "stress"],
    expectedPositive: ["rien", "tout va bien", "serein", "tranquille"],
    expectedNegative: ["travail", "santé", "famille", "argent", "avenir", "beaucoup"]
  },
  {
    id: 5,
    question: "As-tu fait quelque chose d'agréable récemment ?",
    keywords: ["plaisir", "activité", "loisir", "agréable"],
    expectedPositive: ["oui", "beaucoup", "super", "génial", "parfait"],
    expectedNegative: ["non", "rien", "pas vraiment", "difficile", "pas le temps"]
  }
];