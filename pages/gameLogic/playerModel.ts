import {v4} from "uuid"

interface PlayerModel {
  name: string
  isLeader: boolean
  buffs: any[]
  debuffs: any[]
  id: string
}

export class PlayerModelService {
  static createPlayer(
    isLeader: boolean = false,
    name: string = "",
    buffs: any[] = [],
    debuffs: any[] = [],
    id: string = v4(),
  ): PlayerModel {
    return {
      name,
      isLeader,
      buffs,
      debuffs,
      id,
    }
  }
}
