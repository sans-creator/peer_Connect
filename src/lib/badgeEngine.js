// src/lib/badgeEngine.js
export function computeBadges(stats) {
  const badges = [];

  // Explorer: first session
  if (stats.completed >= 1) badges.push("explorer");

  // Helper: 5 sessions (show progress)
  const helperTarget = 5;
  const helperProgress = Math.min(stats.completed, helperTarget);
  const hasHelper = stats.completed >= helperTarget;
  if (hasHelper) badges.push("helper");

  // Star Mentor: 10 distinct 5★ ratings (from different students ideally)
  const starTarget = 10;
  const hasStar = stats.fiveStarCount >= starTarget;
  if (hasStar) badges.push("star-mentor");

  // Knowledge Seeker: 3 different subjects
  const knowledgeTarget = 3;
  const hasKnowledge = stats.subjectsCount >= knowledgeTarget;
  if (hasKnowledge) badges.push("knowledge-seeker");

  return {
    badges,
    progress: {
      helper: { value: helperProgress, total: helperTarget },
      starMentor: { value: Math.min(stats.fiveStarCount, starTarget), total: starTarget },
      knowledge: { value: Math.min(stats.subjectsCount, knowledgeTarget), total: knowledgeTarget },
    },
  };
}
