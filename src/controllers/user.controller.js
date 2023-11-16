let listUsers = [                                                             // membuat variable users yg berisi array of object data users
    {
        id: 1,
        name: "leannne Graham"
    },
    {
        id: 2,
        name: "Bob"
    }
]

let countUser = listUsers.length                                                        // mengambil panjang dari array listUser

exports.getAllUsers = (req, res) => {                                                   // http://localhost:8888/users
    return res.json({                                                                   // server mengirim tanggapan ke client menggunakan method json() yg ada di dalam object respond
        success: true,
        messages: 'List all users',
        results: listUsers                                                              // server mengirim data yang di minta oleh client
    })
}


exports.getDetailUser = (req, res) => {                                                 // http://localhost:8888/users/:id
    const user = listUsers.filter(item => item.id === parseInt(req.params.id))          // melooping array of object users, jika id di path url sama dengan id di object maka callback akan mereturn true dan data akan di simpan di variable user

    if(!user[0]){                                                                       // metode guarding, jika user dengan id di path parameter tidak ada maka program di hentikan dan server mengirim status 404 beserta message berupa json ke client
        return res.status(404).json({
            success: false,
            message: 'User not found'
        })
    }

    return res.json({                                                                   // server mengirim respond ke client berupa json
        success: true,
        messages: 'Ok',
        results: user[0]                                                                // data user dengan id yang ada di parameter url akan di kirim ke client sebagai respond dari server
    })
}


exports.createUser = (req, res) => {
    countUser++                                                                         // reassignment panjang array listUser untuk nantinya di simpan di id user yg baru dibuat
    const {name} = req.body                                                             // mengakses data yg dikirim oleh client dengan cara destructuring

    const user = {                                                                      // membuat variable user
        id: countUser,                                                                  // mengisi id dengan nilai countUser yg sebelumnya di reasign
        name                                                                            // mengisi name dengan nama yg dikirim oleh user
    }

    listUsers.push(user)                                                                // menambahkan data objectuser baru ke dalam array listUser

    return res.json({                                                                   // server mengirim respond ke client menggunakan method json()
        status: true, 
        messages: 'create user success',
        results: user                                                                   // data user baru akan di kirim ke client sebagai respond dari server
    })
}


exports.updateUser = (req, res) => {                                                    // http://localhost:8888/users/:id
    const {id} = req.params                                                             // mengakses parameter path url dengan cara destructuring
    const {name} = req.body                                                             // mengakses data nama yg dikirim client yg berbentuk object dengan cara destructuring

    const userId = listUsers.map(user => user.id).indexOf(parseInt(id))                 // melooping array listUser menggunakan method map lalu di chaining dengan method indexOf. untuk mencari id yang sama dengan id yg ada di parameter path url

    if(userId === -1){                                                                  // jika tidak ada id yg sama maka indexOf akan mengembalikan nilai -1 dan program akan di hentikan dan server akan mengirim respond status 404
        return res.status(404).json({
            success: false,
            message: 'User not found'
        })
    }

    listUsers[userId].name = name                                                       // jika ada id yg sama maka indexOf akan mengembalikan nilai id tersebut. lalu mengakses listUser dengan id tersebut kemudian reassign value nama nya

    return res.json({                                                                   // server mengirim respond json kepada client, untuk memberi tau bahwa proses update data sukses
        status: true, 
        messages: 'update data success',
        results: listUsers[userId]                                                      // server mengirimkan data yg sudah di update ke client
    })
}


exports.deleteUser = (req, res) => {                                                   // http://localhost:8888/users/:id
    const {id} = req.params

    const user = listUsers.filter(user => user.id === parseInt(id))                    // melooping array listUser untuk mencari data dengan id yang sama dengan id yg ada di parameter path id

    if(!user.length){                                                                  // jika tidak ada data id yang sama maka filter akan mengembalikan array kosong dan program akan di hentikan dan server mengirim respond status 404
        return res.status(404).json({
            success: false,
            message: 'User not found'
        })
    }

    listUsers = listUsers.filter(user => user.id !== parseInt(id))                      // listUsers di reassign, data dengan id yg sama dengan id yg ada di parameter tidak akan di masukan, sehingga data akan terhapus dari array listUsers

    return res.json({                                                                   // server mengirim respond json ke client, bahwa proses delete sukses
        status: true, 
        messages: 'delete data success',
        results: user[0]                                                                // server mengirim data yg sudah di hapus ke client, untuk memberi tau client data mana yg sudah di hapus
    })
}