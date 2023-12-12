type MssqlConfig = {
  user: any,
  password: any,
  database: any,
  server: any,
  port?: any,
  trustServerCertificate?: boolean,
  pool?: {},
  options?: {},
}

const mssqlThanvasuInfo: MssqlConfig = {
  user: '',
  password: '',
  server: '',
  database: '',
  trustServerCertificate: true,
  options: { 
    encrypt: false, 
    trustServerCertificate: true
  }
}

export {
  mssqlThanvasuInfo,
} 




