// const usersData2 = [
//   { username: 'Samppa Nori', registered: '2012/01/01', role: 'Member', status: 'Active'},
//   { username: 'Estavan Lykos', registered: '2012/02/01', role: 'Staff', status: 'Banned'},
//   { username: 'Chetan Mohamed', registered: '2012/02/01', role: 'Admin', status: 'Inactive'},
//   { username: 'Derick Maximinus', registered: '2012/03/01', role: 'Member', status: 'Pending'},
//   { username: 'Friderik Dávid', registered: '2012/01/21', role: 'Staff', status: 'Active'},
//   { username: 'Yiorgos Avraamu', registered: '2012/01/01', role: 'Member', status: 'Active'},
//   { username: 'Avram Tarasios', registered: '2012/02/01', role: 'Staff', status: 'Banned', _classes: 'table-success'},
//   { username: 'Quintin Ed', registered: '2012/02/01', role: 'Admin', status: 'Inactive'},
//   { username: 'Enéas Kwadwo', registered: '2012/03/01', role: 'Member', status: 'Pending'},
//   { username: 'Agapetus Tadeáš', registered: '2012/01/21', role: 'Staff', status: 'Active'},
//   { username: 'Carwyn Fachtna', registered: '2012/01/01', role: 'Member', status: 'Active', _classes: 'table-success'},
//   { username: 'Nehemiah Tatius', registered: '2012/02/01', role: 'Staff', status: 'Banned'},
//   { username: 'Ebbe Gemariah', registered: '2012/02/01', role: 'Admin', status: 'Inactive'},
//   { username: 'Eustorgios Amulius', registered: '2012/03/01', role: 'Member', status: 'Pending'},
//   { username: 'Leopold Gáspár', registered: '2012/01/21', role: 'Staff', status: 'Active'},
//   { username: 'Pompeius René', registered: '2012/01/01', role: 'Member', status: 'Active'},
//   { username: 'Paĉjo Jadon', registered: '2012/02/01', role: 'Staff', status: 'Banned'},
//   { username: 'Micheal Mercurius', registered: '2012/02/01', role: 'Admin', status: 'Inactive'},
//   { username: 'Ganesha Dubhghall', registered: '2012/03/01', role: 'Member', status: 'Pending'},
//   { username: 'Hiroto Šimun', registered: '2012/01/21', role: 'Staff', status: 'Active'},
//   { username: 'Vishnu Serghei', registered: '2012/01/01', role: 'Member', status: 'Active'},
//   { username: 'Zbyněk Phoibos', registered: '2012/02/01', role: 'Staff', status: 'Banned'},
//   { username: 'Einar Randall', registered: '2012/02/01', role: 'Admin', status: 'Inactive', _classes: 'table-danger'},
//   { username: 'Félix Troels', registered: '2012/03/21', role: 'Staff', status: 'Active'},
//   { username: 'Aulus Agmundr', registered: '2012/01/01', role: 'Member', status: 'Pending'}
// ]

const usersData = 
    {
        "id": 1,
        "payDate": "2019-12-12T04:11:00.000+0000",
        "amount": 300.0,
        "approveDate": null,
        "paymentStatus": {
            "name": "PENDING"
        },
        "postTutorUser": {
            "id": 1,
            "user": {
                "phone": "0882223331",
                "firstName": "AliceFirst",
                "lastName": "AliceLast",
                "username": "alice",
                "email": "Alick@mail.com",
                "regDate": null,
                "posts": [],
                "postTutorUsers": [],
                "roles": [
                    {
                        "name": "ROLE_MEMBER"
                    },
                    {
                        "name": "ROLE_ADMIN"
                    }
                ]
            },
            "postTutor": {
                "id": 1,
                "price": 300.0,
                "description": "เปิดติวครับ ใครสนใจจอยกับผมได้เลย",
                "postDate": "2020-03-09T18:01:29.619+0000",
                "user": {
                    "phone": "0881112223",
                    "firstName": "BobFirst",
                    "lastName": "BobLast",
                    "username": "bob",
                    "email": "Bob@mail.com",
                    "regDate": null,
                    "posts": [],
                    "postTutorUsers": [],
                    "roles": [
                        {
                            "name": "ROLE_MEMBER"
                        }
                    ]
                }
            }
        }
    }


export default usersData


