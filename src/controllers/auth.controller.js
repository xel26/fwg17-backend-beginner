exports.login = (req, res) => {                                   // client mengirim permintaan memasukan data
    const {username, password} = req.body                                   // server mengakses data yang dikirim client didalam object request
    if(username === "admin@mail.com" && password === "1234"){               // server melakukan logika/operasi program 
        return res.json({                                                   // lalu server mengirim tanggapan kepada client menggunakan method didalam object respond
            success: true,
            message: "Login success"
        })
    }else{
        return res.json({
            success: false,
            message: "wrong username or password"
        })
    }

}