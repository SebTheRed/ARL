export function calculateUserLevels(userData: any, levelScale: any): Record<string, number> {
  let result: Record<string, number> = {};
  let totalLevel = 0;

  // Function to calculate individual trait level
  const calculateCurrentLevel = (skillName: string, XPScale: any): number => {
      const currentXP = userData.xpData[skillName];
      let level = 1;
      for (const [lvl, xp] of Object.entries(XPScale) as [string, number][]) {
          if (currentXP >= xp) {
              level = parseInt(lvl);
          } else {
              break;
          }
      }
      return level;
  };

  // Loop through all traits in userData to sum their levels and populate result object
  for (const trait of Object.keys(userData.xpData)) {
      const level = calculateCurrentLevel(trait, levelScale);
      result[trait] = level;
      totalLevel += level;
  }

  result["totalLevel"] = totalLevel;

  return result;
}