type Region = { low: number; high: number };

const parseRegions = (input: string[]): Region[] =>
  input.map((line) => {
    const [low, high] = line.split('-').map(Number);
    return { low, high };
  });

const consolidateRegions = (regions: Region[]): Region[] => {
  regions.sort((a, b) => a.low - b.low);
  const newRegions: Region[] = [];

  regions.forEach((region) => {
    const { low, high } = region;
    const lastRegion = newRegions[newRegions.length - 1];
    if (!lastRegion) {
      newRegions.push(region);
      return;
    }
    const lastHigh = lastRegion.high;
    if (low <= lastHigh + 1) {
      lastRegion.high = Math.max(lastRegion.high, high);
    } else {
      newRegions.push(region);
    }
  });
  return newRegions;
};

export const day20 = (input: string[]) => {
  const regions = parseRegions(input);
  const minRegions = consolidateRegions(regions);
  return minRegions[0].high + 1;
};

export const day20part2 = (input: string[]) => {
  const max = 4294967295;
  const regions = parseRegions(input);
  const minRegions = consolidateRegions(regions);
  return minRegions.reduce((allowed, region, index) => {
    if (index === minRegions.length - 1) return allowed + max - region.high;
    return allowed + (minRegions[index + 1].low - 1 - region.high);
  }, 0);
};
