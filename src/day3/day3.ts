import { countArr } from "../utils/count"

const whiteSpaceRegex = / +/

const mapTriangles = (input: string[]): number[][] => input.map(line => line.split(whiteSpaceRegex).map(Number))

const mapTriangles2 = (input: string[]): number[][] => {
  const triangles = []
  while (input.length >= 3) {
    const [a, b, c] = [input.pop()?.split(whiteSpaceRegex), input.pop()?.split(whiteSpaceRegex), input.pop()?.split(whiteSpaceRegex)]
    triangles.push([Number(a[0]), Number(b[0]), Number(c[0])])
    triangles.push([Number(a[1]), Number(b[1]), Number(c[1])])
    triangles.push([Number(a[2]), Number(b[2]), Number(c[2])])
  }
  return triangles
}

const isValidTriangle = (triangle: number[]) => {
  triangle.sort((a, b) => a - b)
  const [a, b, c] = triangle
  return a + b > c
}

export const day3 = (input: string[]) => {
  const triangles = mapTriangles(input)
  return countArr(triangles, isValidTriangle)
};
export const day3part2 = (input: string[]) => {
  const triangles = mapTriangles2(input)
  return countArr(triangles, isValidTriangle)
};
