module.exports = {
    getUserRoleInOrg(email,orgId) {
        return [
            {
                "$unwind": {
                    path: "org"      
                }
            },
            {
                "$match": {
                    email: email,
                    "org.orgId": orgId
                }
            },

            {
                "$project": {
                    "org.role": 1
                }
            }
        ]
    }
}