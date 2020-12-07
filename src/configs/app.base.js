import environment from '../configs/environment'

let config = {
  // All config value will be here
  baseUrl: '/adm',
  domainDownloadFile: 'https://acommod.vn/'
}

config = {...config, ...environment}

export default config
