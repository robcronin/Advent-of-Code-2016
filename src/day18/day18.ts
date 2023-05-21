import { countArr, sumArr } from '../utils/array';
import { range } from '../utils/looping';

enum Tile {
  SAFE = '.',
  TRAP = '^',
}
type Map = string[];

const getTile = (left: Tile, center: Tile, right: Tile): Tile => {
  if (left === Tile.TRAP && center === Tile.TRAP && right === Tile.SAFE)
    return Tile.TRAP;
  if (left === Tile.SAFE && center === Tile.TRAP && right === Tile.TRAP)
    return Tile.TRAP;
  if (left === Tile.TRAP && center === Tile.SAFE && right === Tile.SAFE)
    return Tile.TRAP;
  if (left === Tile.SAFE && center === Tile.SAFE && right === Tile.TRAP)
    return Tile.TRAP;
  return Tile.SAFE;
};

const generateMap = (input: string, numRows: number): Map => {
  const map: Map = [input];
  const rowLength = input.length;
  while (map.length < numRows) {
    const lastRow = map[map.length - 1];
    const nextRow = range(rowLength).reduce((row: string, index) => {
      const left = (index - 1 >= 0 ? lastRow[index - 1] : Tile.SAFE) as Tile;
      const center = lastRow[index] as Tile;
      const right = (
        index + 1 < rowLength ? lastRow[index + 1] : Tile.SAFE
      ) as Tile;
      const tile = getTile(left, center, right);
      return row + tile;
    }, '');
    map.push(nextRow);
  }
  return map;
};

const countSafeTiles = (map: Map) =>
  sumArr(map, (row) => countArr([...row], (row) => row === Tile.SAFE));

export const day18 = (input: string, numRows: number) => {
  const map = generateMap(input, numRows);
  return countSafeTiles(map);
};
