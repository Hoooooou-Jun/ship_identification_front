const app = require('../../app.json')
export const AppVersion = 'v' + app.expo.version

// 개발자 모드 ( 1번은 일반모드, 0번은 개발모드)
// running checking
const server_status = ["running", "checking"]
export const UnderInspection = server_status[1]
