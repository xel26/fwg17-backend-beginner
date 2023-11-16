exports.getAllUsers = (req, res) => {                                      // http://localhost:8888/users/
    return res.json({
        success: true,
        messages: 'List all users',
        results: [
            {
                id: 1,
                name: "leannne Graham"
            },
            {
                id: 2,
                name: "Bob"
            }
        ]
    })
}


exports.getParameterUrl = (req, res) => {                                    // http://localhost:8888/users/1?name=Leanne
    return res.json({
        success: true,
        messages: 'Get Parameter From url',
        results: 
            {
                id: req.params.id,                                            // mengakses parameter path url                                           
                name: req.query.name                                          // mengakses parameter query string url
            }
    })
}


exports.insertData = (req, res) => {
    const {username, email} = req.body
    return res.json({
        status: true, 
        messages: 'insert data success',
        results: 
            {
                username: username,
                email: email
            }
    })
}


exports.updateData = (req, res) => {
    return res.json({
        status: true, 
        messages: 'update data success',
    })
}


exports.replaceData = (req, res) => {
    return res.json({
        status: true, 
        messages: 'replace data success',
    })
}


exports.deleteData = (req, res) => {
    return res.json({
        status: true, 
        messages: 'delete data success',
    })
}