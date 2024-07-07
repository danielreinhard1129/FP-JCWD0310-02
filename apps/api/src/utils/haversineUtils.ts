interface IHaversinePayload<S> {
  lat: number;
  lon: number;
  data: S;
}

export function haversineUtils<T>(
  targetLocation: Omit<IHaversinePayload<any>, 'data'>,
  locationData: IHaversinePayload<T>[],
): IHaversinePayload<T> {
  const vectorDistance = (dx: number, dy: number) =>
    Math.sqrt(dx * dx + dy * dy);

  const locationDistance = (
    location1: Omit<IHaversinePayload<any>, 'data'>,
    location2: Omit<IHaversinePayload<any>, 'data'>,
  ) => {
    const dx = location1.lat - location2.lat;
    const dy = location1.lon - location2.lon;
    return vectorDistance(dx, dy);
  };

  return locationData.reduce((a, b) => {
    const prevDistance = locationDistance(targetLocation, a);
    const currDistance = locationDistance(targetLocation, b);
    return prevDistance < currDistance ? a : b;
  });
}
