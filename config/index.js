// Common Environment Variables
const commonVariables = {
    
    APP_PORT: '7000',
    MONGODB_CON_STRING: 'mongodb://localhost/tutorbin-db',
    PASS_SALT_STATIC: 'TUTORdSDFeFenyL2jaSDasdaeFenyL2jas@766sar7^^#&W^FSBGg7dBG7q3FSQBIN'
    
}

//setting the common variables
Object.keys(commonVariables).forEach((key) => {
    process.env[key] = commonVariables[key];
})