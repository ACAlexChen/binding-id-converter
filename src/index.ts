import { Context, Schema, Service } from 'koishi'



export const name = 'binding-id-converter'



class idconverter extends Service {
  static inject = ['database']
  constructor(ctx: Context) {
    super(ctx, 'idconverter', true)
  }

  async pidConverter(pid: string, original_platform: string, target_platform) {
    let aid = (await this.ctx.database.get('binding', {'pid': pid,'platform': original_platform},['aid']))[0].aid
    let target_pid = (await this.ctx.database.get('binding',{'aid': aid,'platform': target_platform},['pid']))[0].pid
    return target_pid
  }

  async getUserAid(pid: string, platform: string){
    let aid = (await this.ctx.database.get('binding', {'pid': pid,'platform': platform},['aid']))[0].aid
    return aid
  }
}
declare module 'koishi' {
  interface Context {
    idconverter: idconverter
  }
}


namespace idconverter {
  export interface Config {}

  export const Config: Schema<Config> = Schema.object({})
}

export default idconverter