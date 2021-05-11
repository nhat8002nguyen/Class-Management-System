const sampleUsers = [
    {
        id: 'd92b8c7f-afee-4700-a350-4d9c5b288040',
        code: 1710000,
        name: 'Nguyễn Văn ZZZ',
        email: 'zzz.nv.cse@hcmut.edu.vn'
    },
    {
        id: 'd92b8c7f-afee-4700-a350-4d9c5b288041',
        code: 1710001,
        name: 'Nguyễn Văn A',
        email: 'a.nv.cse@hcmut.edu.vn'
    },
    {
        id: 'd92b8c7f-afee-4700-a350-4d9c5b288042',
        code: 1710002,
        name: 'Nguyễn Văn B',
        email: 'b.nv.cse@hcmut.edu.vn'
    },
    {
        id: 'd92b8c7f-afee-4700-a350-4d9c5b288043',
        code: 1710003,
        name: 'Nguyễn Văn C',
        email: 'c.nv.cse@hcmut.edu.vn'
    },
    {
        id: 'd92b8c7f-afee-4700-a350-4d9c5b288044',
        code: 1710004,
        name: 'Nguyễn Văn D',
        email: 'd.nv.cse@hcmut.edu.vn'
    },
    {
        id: 'd92b8c7f-afee-4700-a350-4d9c5b288045',
        code: 1710005,
        name: 'Nguyễn Văn E',
        email: 'e.nv.cse@hcmut.edu.vn'
    }
]

module.exports = async (Users) => {
    for (const user of sampleUsers) {
        await Users.create(user);
    }
}
