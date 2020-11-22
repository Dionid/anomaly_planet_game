import {v4} from "uuid"

interface PlayerModel {
  name: string
  isLeader: boolean
  isDead: boolean
  foodNeed: number
  buffs: any[]
  debuffs: any[]
  id: string
}

export class PlayerModelService {
  static createPlayer(
    isLeader: boolean = false,
    isDead: boolean = false,
    foodNeed: number = 1,
    name: string = "",
    buffs: any[] = [],
    debuffs: any[] = [],
    id: string = v4(),
  ): PlayerModel {
    return {
      name,
      isLeader,
      isDead,
      foodNeed,
      buffs,
      debuffs,
      id,
    }
  }
}
