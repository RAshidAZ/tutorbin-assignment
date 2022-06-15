// Common Environment Variables
const commonVariables = {
    
    APP_PORT: '7000',
    mongoConnectionString: 'mongodb://localhost/tutorbin-db',
    
}

//setting the common variables
Object.keys(commonVariables).forEach((key) => {
    process.env[key] = commonVariables[key];
})