type Room = {
  name: string;
  dashedName: string;
  sectorId: number;
  checksum: string;
};

const parseRooms = (roomString: string): Room => {
  const groups = roomString.match(
    new RegExp('^([a-z, -]+)-([0-9]+)\\[([a-z]+)\\]$'),
  );
  if (!groups) throw new Error(`Invalid roomString: ${roomString}`);
  const [_, dashedName, sectorId, checksum] = groups;
  const name = dashedName.split('-').join('');
  return { name, sectorId: +sectorId, checksum, dashedName };
};

const isRoomReal = (room: Room): boolean => {
  const counts = [...room.name].reduce(
    (acc: Record<string, number>, letter) => {
      if (acc[letter]) return { ...acc, [letter]: acc[letter] + 1 };
      return { ...acc, [letter]: 1 };
    },
    {},
  );
  const sortedMaxes = Object.values(counts).sort((a, b) => b - a);
  return [...room.checksum].every((check, index) => {
    if (counts[check] !== sortedMaxes[index]) return false;
    if (
      index < room.checksum.length - 1 &&
      sortedMaxes[index] === sortedMaxes[index + 1] &&
      check > room.checksum[index + 1]
    )
      return false;
    return true;
  });
};

const decryptRoom = (room: Room) =>
  [...room.dashedName]
    .map((letter) => {
      const code = letter.charCodeAt(0);
      if (code === 45) return ' ';
      const index = code - 97;
      const newIndex = (index + room.sectorId) % 26;
      return String.fromCharCode(newIndex + 97);
    })
    .join('');

export const day4 = (input: string[]) => {
  const rooms = input.map(parseRooms);
  return rooms.reduce((sum, room) => {
    if (isRoomReal(room)) return sum + room.sectorId;
    return sum;
  }, 0);
};

export const day4part2 = (input: string[]) => {
  const rooms = input.map(parseRooms);
  const storageRoom = rooms.find((room) => {
    const secret = decryptRoom(room);
    return secret.includes('north');
  });
  return storageRoom?.sectorId;
};
