const objectId = require('mongoose').Types.ObjectId;

module.exports = {
    getUserRoleInOrg(email,orgId) {
        return [
            {
                "$unwind": {
                    path: "$org"      
                }
            },
            {
                "$match": {
                    email: email,
                    "org.orgId": objectId(orgId)
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