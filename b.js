var bcrypt = require('bcryptjs');

async function main(){
    let xx =  await bcrypt.hash('123456', 10);
    console.log(xx)
}

main()