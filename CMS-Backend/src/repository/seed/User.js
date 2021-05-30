const bcrypt = require('bcrypt');
const config = require('../../config');

const sampleUsers = [
    {
        id: 'd92b8c7f-afee-4700-a350-4d9c5b288040',
        type: 1,
        name: 'Nguyễn Văn ZZZ',
        email: 'zzz.nv.cse@hcmut.edu.vn',
        password: bcrypt.hashSync('12345', config.SECRET)
    },
    {
        id: 'd92b8c7f-afee-4700-a350-4d9c5b288041',
        type: 2,
        name: 'Nguyễn Văn A',
        email: 'a.nv.cse@hcmut.edu.vn',
        password: bcrypt.hashSync('12345', config.SECRET)
    },
    {
        id: 'd92b8c7f-afee-4700-a350-4d9c5b288042',
        type: 2,
        name: 'Nguyễn Văn B',
        email: 'b.nv.cse@hcmut.edu.vn',
        password: bcrypt.hashSync('12345', config.SECRET)
    },
    {
        id: 'd92b8c7f-afee-4700-a350-4d9c5b288043',
        type: 2,
        name: 'Nguyễn Văn C',
        email: 'c.nv.cse@hcmut.edu.vn',
        password: bcrypt.hashSync('12345', config.SECRET)
    },
    {
        id: 'd92b8c7f-afee-4700-a350-4d9c5b288044',
        type: 2,
        name: 'Nguyễn Văn D',
        email: 'd.nv.cse@hcmut.edu.vn',
        password: bcrypt.hashSync('12345', config.SECRET)
    },
    {
        id: 'd92b8c7f-afee-4700-a350-4d9c5b288045',
        type: 2,
        name: 'Nguyễn Văn E',
        email: 'e.nv.cse@hcmut.edu.vn',
        password: bcrypt.hashSync('12345', config.SECRET)
    }
]

module.exports = async (Users) => {
    for (const user of sampleUsers) {
        await Users.create(user);
    }
}
