
module.exports = {
    user: {
        get: "select * from user where user =?",
    },
    company:{
        get:"select * from company",
        search:" select * from company where qqname like CONCAT('%', ?, '%')",
        add:"insert into company(time_zz,qqname,sjh,yx,qyyx,dlr,lxfs,qqdq,tag) values (?,?,?,?,?,?,?,?,?)"
    },
    rank:{
        get:"select * from r where qqname=?",
    }

};
