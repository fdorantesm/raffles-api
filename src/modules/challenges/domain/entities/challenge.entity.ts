export class ChallengeEntity {
  constructor(
    public uuid: string,
    public name: string,
    public playlistId: string,
    public startsAt: Date,
    public endsAt: Date,
    public isActive: boolean,

    public opensAt: Date,
  ) {}
}
