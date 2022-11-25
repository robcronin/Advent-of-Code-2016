export const day1 = (input: string[]) => {
  const dirX = [0, 1, 0, -1]
  const dirY = [1, 0, -1, 0]
  let dir = 0
  let [posX, posY] = [0, 0]

  input.forEach(movement => {
    if (movement[0] === 'R') {
      dir = (dir + 1) % 4
    } else {
      dir = (dir + 3) % 4
    }
    const steps = Number(movement.substring(1))
    posX += steps * dirX[dir]
    posY += steps * dirY[dir]
  })
  return Math.abs(posX) + Math.abs(posY);
};

export const day1part2 = (input: string[]) => {
  const dirX = [0, 1, 0, -1]
  const dirY = [1, 0, -1, 0]
  let dir = 0
  let [posX, posY] = [0, 0]

  const visits: string[] = []
  let ans = 0

  for (const movement of input) {
    if (movement[0] === 'R') {
      dir = (dir + 1) % 4
    } else {
      dir = (dir + 3) % 4
    }
    const steps = Number(movement.substring(1))
    for (let i = 0; i < steps; i++) {
      posX += dirX[dir]
      posY += dirY[dir]
      if (visits.includes(`${posX},${posY}`) && ans === 0) {
        return Math.abs(posX) + Math.abs(posY);
      }
      visits.push(`${posX},${posY}`)
    }
  }
  console.log(visits)
  return ans;
};
